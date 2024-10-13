
export const submitData = async (from, to, userInput) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "from": from,
                    "to": to,
                    "word": userInput
                })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};


export const getAudioBuffer = async (word) => {
    try {
        const response = await fetch(process.env.REACT_APP_AUDIO_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        return audioBuffer;
    } catch (error) {
        console.error('There was a problem fetching the audio buffer:', error);
        throw error;
    }
};