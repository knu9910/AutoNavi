export const getSpeech = (text) => {
  // 음성 데이터 로드
  const loadVoices = async () => {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          clearInterval(intervalId);
          resolve(voices);
        }
      }, 100);
    });
  };

  // 음성 합성 함수
  const speak = async (txt) => {
    const lang = 'ko-KR';
    const voices = await loadVoices();

    // 한국어 voice 찾기
    const kor_voice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace('-', '_'),
    );

    if (kor_voice) {
      const utterThis = new SpeechSynthesisUtterance(txt);
      utterThis.lang = lang;
      utterThis.voice = kor_voice;
      window.speechSynthesis.speak(utterThis);
    } else {
      console.error('한국어 목소리를 찾을 수 없습니다.');
    }
  };

  // 브라우저에서 SpeechSynthesis 및 오디오 권한 확인
  if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
    speak(text);
  } else {
    console.error('음성 합성을 지원하지 않습니다.');
  }
};
