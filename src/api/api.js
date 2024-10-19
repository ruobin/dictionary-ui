
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

export const getAudioBufferFromBase64 = async (base64String) => {
    try {
        // Decode base64 string to binary string
        const binaryString = atob(base64String);

        // Convert binary string to ArrayBuffer
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const arrayBuffer = bytes.buffer;

        // Create an AudioContext and decode the ArrayBuffer into an AudioBuffer
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        return audioBuffer;
    } catch (error) {
        console.error('There was a problem decoding the audio buffer:', error);
        throw error;
    }
};


export const getAudioBuffer = async (languageCode, word) => {
    try {
        const response = await fetch(process.env.REACT_APP_GOOGLE_AUDIO_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word, languageCode })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Read the response body as a stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let base64AudioContent = '';
        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = streamDone;
            if (value) {
                base64AudioContent += decoder.decode(value, { stream: true });
            }
        }

        const audioBuffer = await getAudioBufferFromBase64(base64AudioContent);

        return audioBuffer;
    } catch (error) {
        console.error('There was a problem fetching the audio buffer:', error);
        throw error;
    }
};