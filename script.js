  document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const dashboardSection = document.getElementById("dashboard-section");
    const greetingEl = document.getElementById("greeting");
    const ageInMonthsEl = document.getElementById("ageInMonths");
    const ageGateMessageEl = document.getElementById("ageGateMessage");
    const quoteList = document.getElementById("quoteList");
    const clearBtn = document.getElementById("clearBtn");


    const MOTIVATIONAL_QUOTE = "The only way to do great work is to love what you do.";
    
    
    checkExistingUser();

    
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();

        
        const name = document.getElementById("userName").value.trim();
        const age = parseInt(document.getElementById("userAge").value, 10);

        
        localStorage.setItem("username", name);
        localStorage.setItem("userAge", age);

        
        renderDashboard(name, age);
    });


    clearBtn.addEventListener("click", () => {
        localStorage.clear();
        dashboardSection.classList.add("hidden");
        userForm.reset();
        window.location.reload(); 
    });

    
    function checkExistingUser() {
        const storedName = localStorage.getItem("username");
        const storedAge = localStorage.getItem("userAge");

        if (storedName && storedAge) {
            renderDashboard(storedName, parseInt(storedAge, 10));
        }
    }

    
    function renderDashboard(name, age) {
        dashboardSection.classList.remove("hidden");

        greetingEl.textContent = `Hello, ${name}! Welcome back to your portal.`;

        
        const totalMonths = calculateAgeInMonths(age);
        ageInMonthsEl.textContent = `You have been alive for approximately ${totalMonths.toLocaleString()} months! 🎉`;

        checkAgeRestriction(age);
        displayQuotes(MOTIVATIONAL_QUOTE, 1);
    }

    function calculateAgeInMonths(years) {
        return years * 12;
    }

    
    function checkAgeRestriction(age) {
        if (age >= 16) {
            ageGateMessageEl.textContent = " Access Granted: You are old enough to view adult content.";
            ageGateMessageEl.className = "p-4 rounded-xl font-medium border bg-green-50 border-green-200 text-green-800";
        } else {
            ageGateMessageEl.textContent = " Access Restricted: You are too young for adult content.";
            ageGateMessageEl.className = "p-4 rounded-xl font-medium border bg-amber-50 border-amber-200 text-amber-800";
        }
    }


    function displayQuotes(quote, repetitions) {
        quoteList.innerHTML = "";

        for (let i = 0; i < repetitions; i++) {
            const li = document.createElement("li");
            li.className = "text-sm text-gray-600 italic bg-gray-50 border-l-4 border-indigo-500 p-2 rounded-r shadow-sm";
            li.textContent = `"${quote}"`;
            quoteList.appendChild(li);
        }
    }
});