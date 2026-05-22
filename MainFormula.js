// const fallbackImage = "https://cdn.vectorstock.com/i/1000v/02/35/coming-soon-black-background-design-vector-41670235.jpg";

        const selector = document.getElementById("raceSelector");
        const raceCountry = document.getElementById("raceCountry");
        const raceInfo = document.getElementById("raceInfo");
        const trackImage = document.getElementById("trackImage");

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        let interval = null;

        /* IMAGE SAFE LOADER */
        function loadTrack(url) {
            if (!url) { trackImage.src = fallbackImage; return; }
            const img = new Image();
            img.onload = () => trackImage.src = url;
            img.onerror = () => trackImage.src = fallbackImage;
            img.src = url;
        }

        /* COUNTDOWN */
        function startCountdown() {
            if (interval) clearInterval(interval);

            const selected = selector.options[selector.selectedIndex];
            const target = new Date(selected.value).getTime();

            raceCountry.textContent = selected.dataset.country;
            raceInfo.textContent = `${selected.dataset.location} • ${selected.dataset.display}`;
            document.title = `${selected.dataset.country} Grand Prix | F1 2026`;

            loadTrack(selected.dataset.track);

            interval = setInterval(() => {
                const now = Date.now();
                const gap = target - now;

                if (gap <= 0) {
                    clearInterval(interval);
                    updateTimer(0, 0, 0, 0);
                    return;
                }

                updateTimer(
                    Math.floor(gap / 86400000),
                    Math.floor((gap % 86400000) / 3600000),
                    Math.floor((gap % 3600000) / 60000),
                    Math.floor((gap % 60000) / 1000)
                );
            }, 1000);
        }

        function updateTimer(d, h, m, s) {
            days.textContent = d.toString().padStart(2, "0");
            hours.textContent = h.toString().padStart(2, "0");
            minutes.textContent = m.toString().padStart(2, "0");
            seconds.textContent = s.toString().padStart(2, "0");
        }

        selector.addEventListener("change", startCountdown);
        startCountdown();

        /* FULLSCREEN */
        const fullscreenMap = document.getElementById("fullscreenMap");
        const fullscreenImage = document.getElementById("fullscreenImage");
        const closeMap = document.getElementById("closeMap");

        trackImage.addEventListener("click", () => {
            fullscreenImage.src = trackImage.src;
            fullscreenMap.classList.add("active");
        });

        closeMap.addEventListener("click", () => fullscreenMap.classList.remove("active"));
        fullscreenMap.addEventListener("click", e => {
            if (e.target === fullscreenMap) fullscreenMap.classList.remove("active");
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape") fullscreenMap.classList.remove("active");
        });