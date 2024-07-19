 console.log("this is my script");

 let result = {
    tag: "",
    free: true,
    role: false,
    user: "divya.singh9354",
    email: "divya.singh9354@gmail.com",
    score: 0.48,
    state: "unknown",
    domain: "gmail.com",
    reason: "no_connect",
    mx_found: true,
    catch_all: null,
    disposable: false,
    smtp_check: false,
    did_you_mean: "",
    format_valid: true,
  };
//   console.log(result);

  document.addEventListener("DOMContentLoaded", () => {
    const submitbtn = document.getElementById("submitbtn");

    console.log('1');
    console.log(submitbtn);
    if (submitbtn) {
        console.log('2');
        submitbtn.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log('3');
            console.log("clicked!");

            let resultCont = document.getElementById("resultCont");
            resultCont.innerHTML = `<img width="200px" src="img/Spinner@1x-1.0s-200px-200px.svg" alt="Loading...">`;

            let key = "ema_live_vr9S2d3n8A8IoNUqEiZ9ZGmfBQLcFZ6cqZBTpgQc";
            let email = document.getElementById("username").value;
            let cacheBuster = new Date().getTime();
            let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}&cb=${cacheBuster}`;

            console.log(`Fetching URL: ${url}`);  // Debugging line

            try {
                let res = await fetch(url, {
                    method: 'GET', // Ensuring GET method
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    cache: 'no-store' // No caching to prevent 405 errors
                });

                console.log(`Response Status: ${res.status}`);  // Debugging line
                if (!res.ok) {
                    throw new Error(`Network response was not ok: ${res.statusText} (Status: ${res.status})`);
                }

                let result = await res.json();
                console.log('API response:', result);  // Debugging line

                // Clear the previous results
                resultCont.innerHTML = '';

                let str = ``;
                for (let key of Object.keys(result)) {
                    str += `<div>${key} : ${result[key]}</div>`;
                }

                console.log('Result HTML:', str);  // Debugging line
                resultCont.innerHTML = str;
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                resultCont.innerHTML = `<div>There was an error fetching the data. Please try again later.</div>`;
            }
        });
    }
});
