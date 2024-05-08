const RAPIDAPI_KEY = '82e21589aemsh1e627f830a41cd4p1c452bjsn9902eea8ce96';


async function detectLanguage(text) {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: text
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result); // Log the result object for debugging
        return result.data.detections[0][0].language;
    } catch (error) {
        console.error(error);
        throw new Error('Language detection failed');
    }
}


async function translateText(text, sourceLang, targetLang) {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: text,
            source: sourceLang,
            target: targetLang
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result); // Log the result object for debugging
        return result.data.translations[0].translatedText; // Return the translated text
    } catch (error) {
        console.error(error);
        throw new Error('Translation failed');
    }
}


function updateTranslatedText(translatedText) {
    document.getElementById('target-text').value = translatedText;
}


document.getElementById('source-text').addEventListener('input', async function () {
    const sourceText = this.value;
    const sourceLang = await detectLanguage(sourceText); // Detect source language
    const targetLang = document.getElementById('target-language').value;

    try {
        const translatedText = await translateText(sourceText, sourceLang, targetLang);
        updateTranslatedText(translatedText);
    } catch (error) {
        console.error(error);
        
    }
});


document.getElementById('source-language').addEventListener('change', async function () {
    const sourceText = document.getElementById('source-text').value;
    const sourceLang = this.value;
    const targetLang = document.getElementById('target-language').value;

    try {
        const translatedText = await translateText(sourceText, sourceLang, targetLang);
        updateTranslatedText(translatedText);
    } catch (error) {
        console.error(error);
        
    }
});