import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io.connect('http://localhost:3001');

function VoiceChat() {
    const [speakingUsers, setSpeakingUsers] = useState({});
    const userAudio = useRef(null);
    const peerRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = socket;

        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then(stream => {
                userAudio.current.srcObject = stream;
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = 0.3;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);

                javascriptNode.onaudioprocess = () => {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    const values = array.reduce((prev, curr) => prev + curr, 0);
                    const average = values / array.length;

                    // 자신의 음성 상태 업데이트
                    const userId = socket.id;
                    setSpeakingUsers(prevState => ({
                        ...prevState,
                        [userId]: { isSpeaking: average > 10, micOn: stream.getAudioTracks()[0].enabled }
                    }));

                    socket.emit('speaking', { userId, isSpeaking: average > 10 });
                };

                peerRef.current = new SimplePeer({
                    initiator: true,
                    trickle: false,
                    stream: stream,
                });

                peerRef.current.on('signal', signal => {
                    socketRef.current.emit('signal', signal);
                });

                socketRef.current.on('signal', signal => {
                    peerRef.current.signal(signal);
                });

                peerRef.current.on('stream', stream => {
                    userAudio.current.srcObject = stream;
                    userAudio.current.play();
                });

                // 마이크 상태 변경 이벤트 설정
                stream.getAudioTracks()[0].onmute = () => {
                    const userId = socket.id;
                    setSpeakingUsers(prevState => ({
                        ...prevState,
                        [userId]: { ...prevState[userId], micOn: false }
                    }));
                };
                stream.getAudioTracks()[0].onunmute = () => {
                    const userId = socket.id;
                    setSpeakingUsers(prevState => ({
                        ...prevState,
                        [userId]: { ...prevState[userId], micOn: true }
                    }));
                };
            })
            .catch(err => {
                console.error('Error accessing media devices.', err);
                alert('마이크 장치가 없습니다. 마이크를 연결하거나 권한을 확인해주세요.');
            });

        // 다른 사용자의 음성 상태 업데이트
        socketRef.current.on('speaking', ({ userId, isSpeaking }) => {
            setSpeakingUsers(prevState => ({
                ...prevState,
                [userId]: { ...prevState[userId], isSpeaking }
            }));
        });
    }, []);

    return (
        <div>
            <audio ref={userAudio} autoPlay controls />
            <div>
                총참여수 : {Object.keys(speakingUsers).length}
                {Object.entries(speakingUsers).map(([userId, { isSpeaking, micOn }]) => (
                    <p key={userId}>{userId}: {isSpeaking ? '말하는 중...' : '대기 중...'} (마이크: {micOn ? '켜짐' : '꺼짐'})</p>
                ))}
            </div>
        </div>
    );
}

export default VoiceChat;
