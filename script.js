// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-dark)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--brass-gold)';
    }
});

// Menu Tabs Switcher
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Gallery Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.style.background = 'transparent';
            b.style.color = 'var(--text-main)';
        });
        btn.style.background = 'var(--brass-gold)';
        btn.style.color = 'var(--bg-dark)';

        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 1. Aapke saare 5 images
    const imagesList = [
        "bg1.jpeg",
        "bg2.jpeg",
        "herobg1.jpeg",
        "bg3.jpeg",
        "bg4.jpeg"
    ];

    // Online High Quality Fallback Images (Agar local file name ya path galat ho toh yeh dikhegi)
    const fallbackList = [
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ];

    let currentIndex = 0;
    const layerA = document.getElementById("vignetteLayerA");
    const layerB = document.getElementById("vignetteLayerB");

    if (!layerA || !layerB) return;

    let activeLayer = layerA;
    let bufferLayer = layerB;

    // Smart Image Setter with Error Protection
    function setSafeImage(element, index) {
        const primarySrc = imagesList[index];
        const fallbackSrc = fallbackList[index];

        const imgTester = new Image();
        imgTester.src = primarySrc;

        imgTester.onload = function () {
            element.style.backgroundImage = `url('${primarySrc}')`;
        };

        imgTester.onerror = function () {
            // Agar local file nahi mili toh fallback image set ho jayegi taaki blank na ho
            element.style.backgroundImage = `url('${fallbackSrc}')`;
        };
    }

    // Set First Image Initial State
    setSafeImage(activeLayer, 0);

    setInterval(() => {
        // Increment Index for next slide
        currentIndex = (currentIndex + 1) % imagesList.length;

        // 1. Buffer Layer par agli image ready karo
        setSafeImage(bufferLayer, currentIndex);

        // 2. Buffer Layer ko upper layer par fade-in karo
        bufferLayer.classList.add("active");

        // 3. Purani active layer ko transition complete hone ke baad piche karo
        setTimeout(() => {
            activeLayer.classList.remove("active");

            // Swap reference pointers for next loop turn
            let temp = activeLayer;
            activeLayer = bufferLayer;
            bufferLayer = temp;
        }, 1200); // 1.2 Second CSS transition duration

    }, 3800); // Har 3.8 Second mein image badlegi
});

// Audio Background Loop Toggle
const audioToggleBtn = document.getElementById('audioToggle');
const ragaAudio = document.getElementById('ragaAudio');
const audioText = document.getElementById('audioText');
let isAudioPlaying = false;

audioToggleBtn.addEventListener('click', () => {
    if (!isAudioPlaying) {
        ragaAudio.play().then(() => {
            isAudioPlaying = true;
            audioToggleBtn.classList.add('playing');
            audioText.textContent = 'Pause Raga Loop';
        }).catch(err => console.log("Audio play error:", err));
    } else {
        ragaAudio.pause();
        isAudioPlaying = false;
        audioToggleBtn.classList.remove('playing');
        audioText.textContent = 'Play Raga Loop';
    }
});

function startSwaranjaliSlideshow() {
    const slides = document.querySelectorAll('#vignetteSlider .v-slide');
    if (!slides || slides.length === 0) return;

    let currentIndex = 0;

    setInterval(function () {
        let previousIndex = currentIndex;
        currentIndex = (currentIndex + 1) % slides.length;

        // 1. Agli image par active class lagao (Fade-In shuru)
        slides[currentIndex].classList.add('active');

        // 2. Pichli image ki active class 1.2s baad hatao (No blank background)
        setTimeout(function () {
            slides[previousIndex].classList.remove('active');
        }, 1200);

    }, 3500); // Har 3.5 second mein agla photo aayega
}

// Ensure execution even if DOMContentLoaded is delayed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSwaranjaliSlideshow);
} else {
    startSwaranjaliSlideshow();
}
function openOfferDetail(blockId) {
    const element = document.getElementById(blockId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Dynamic Page View Switcher (Buffet / Tiffin / Home)
        function showPage(pageId) {
            // 1. Hide all dynamic page views
            const pages = document.querySelectorAll('.promotions-container .page-view');
            pages.forEach(function(page) {
                page.classList.remove('active-view');
            });

            // 2. Show selected view
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active-view');
                
                // 3. Smooth scroll to promotions section
                const promoContainer = document.getElementById('promotions');
                if (promoContainer) {
                    promoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        // Menu Tab Switcher Function
        function switchMenuTab(evt, tabId) {
            var tabs = document.querySelectorAll('.menu-tabs .tab-btn');
            var contents = document.querySelectorAll('.tab-content-container .tab-content');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            if (evt && evt.currentTarget) {
                evt.currentTarget.classList.add('active');
            }
            var targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            var nav = document.getElementById("navLinks");
            if (nav) nav.classList.toggle("active");
        }

        // Hero Direct Loop
        function runDirectLoop() {
            if (window.swaranjaliLoopStarted) return;
            window.swaranjaliLoopStarted = true;

            var slides = document.querySelectorAll('#vignetteSlider .v-slide');
            if (!slides || slides.length === 0) return;

            var currIdx = 0;
            setInterval(function () {
                var prevIdx = currIdx;
                currIdx = (currIdx + 1) % slides.length;
                slides[currIdx].classList.add('active');
                setTimeout(function () {
                    slides[prevIdx].classList.remove('active');
                }, 1200);
            }, 3500);
        }

        setTimeout(runDirectLoop, 500);

        // Website load hone ke 4 seconds baad Auto Ad Dikhane ka code
window.addEventListener('load', function() {
    setTimeout(function() {
        var adModal = document.getElementById('adModal');
        if (adModal) {
            adModal.classList.add('show');
        }
    }, 4000); // 4000ms = 4 seconds
});

// Popup Close karne ka function
function closeAdPopup() {
    var adModal = document.getElementById('adModal');
    if (adModal) {
        adModal.classList.remove('show');
    }
}
// Website open hone ke 5 seconds (5000ms) baad modal show hoga
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const modal = document.getElementById('swaranjaliAdModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }, 5000);
});

// Close Modal Function
function closeAdModal() {
    const modal = document.getElementById('swaranjaliAdModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Tab Switching Function (Buffet vs Tiffin)
function switchAdTab(type) {
    const buffetContent = document.getElementById('buffetAdContent');
    const tiffinContent = document.getElementById('tiffinAdContent');
    const buffetBtn = document.getElementById('buffetTabBtn');
    const tiffinBtn = document.getElementById('tiffinTabBtn');

    if (type === 'buffet') {
        buffetContent.classList.add('active');
        tiffinContent.classList.remove('active');
        buffetBtn.classList.add('active');
        tiffinBtn.classList.remove('active');
    } else {
        tiffinContent.classList.add('active');
        buffetContent.classList.remove('active');
        tiffinBtn.classList.add('active');
        buffetBtn.classList.remove('active');
    }
}