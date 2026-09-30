```javascript
// Get saved applications
let applications =
    JSON.parse(localStorage.getItem("applications")) || [];


// Open Modal
function openModal() {
    document.getElementById("modal").style.display = "flex";
}


// Close Modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}


// Save Application
document.getElementById("applicationForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const application = {

        id: Date.now(),

        jobTitle:
            document.getElementById("jobTitle").value,

        company:
            document.getElementById("company").value,

        location:
            document.getElementById("location").value,

        applicationDate:
            document.getElementById("applicationDate").value,

        status:
            document.getElementById("status").value,

        followUp:
            document.getElementById("followUp").value,

        interviewDate:
            document.getElementById("interviewDate").value,

        notes:
            document.getElementById("notes").value
    };


    applications.push(application);

    saveData();

    displayApplications();

    this.reset();

    closeModal();
});


// Save data in browser
function saveData() {

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

}


// Display Applications
function displayApplications() {

    const list =
        document.getElementById("applicationList");

    const search =
        document.getElementById("searchInput")
        .value.toLowerCase();

    const filter =
        document.getElementById("statusFilter").value;


    list.innerHTML = "";


    const filtered =
        applications.filter(app => {

            const matchesSearch =
                app.jobTitle.toLowerCase()
                .includes(search) ||

                app.company.toLowerCase()
                .includes(search);

            const matchesStatus =
                filter === "All" ||
                app.status === filter;

            return matchesSearch && matchesStatus;
        });


    if (filtered.length === 0) {

        list.innerHTML = `
            <div class="application-card">
                <div>
                    <h3>No applications found</h3>
                    <p class="details">
                        Add your first job application.
                    </p>
                </div>
            </div>
        `;

        updateDashboard();

        return;
    }


    filtered.forEach(app => {

        const card =
            document.createElement("div");

        card.className = "application-card";


        card.innerHTML = `

            <div>

                <h3>${escapeHTML(app.jobTitle)}</h3>

                <div class="company">
                    ${escapeHTML(app.company)}
                </div>

                <div class="details">
                    📍 ${escapeHTML(app.location || "Not specified")}
                </div>

                <div class="details">
                    📅 Applied:
                    ${app.applicationDate || "Not specified"}
                </div>

                ${
                    app.followUp
                    ? `<div class="details">
                        🔔 Follow-up:
                        ${app.followUp}
                       </div>`
                    : ""
                }

                ${
                    app.interviewDate
                    ? `<div class="details">
                        🎯 Interview:
                        ${app.interviewDate}
                       </div>`
                    : ""
                }

                ${
                    app.notes
                    ? `<div class="details">
                        📝 ${escapeHTML(app.notes)}
                       </div>`
                    : ""
                }

                <span class="status ${app.status}">
                    ${app.status}
                </span>

            </div>

            <div>

                <button
                    class="delete-btn"
                    onclick="deleteApplication(${app.id})">
                    Delete
                </button>

            </div>
        `;


        list.appendChild(card);

    });


    updateDashboard();
    displayReminders();
}


// Delete Application
function deleteApplication(id) {

    if (!confirm("Delete this application?")) {
        return;
    }

    applications =
        applications.filter(app => app.id !== id);

    saveData();

    displayApplications();
}


// Update Dashboard
function updateDashboard() {

    const total = applications.length;

    const applied =
        applications.filter(
            app => app.status === "Applied"
        ).length;

    const interviews =
        applications.filter(
            app => app.status === "Interview"
        ).length;

    const offers =
        applications.filter(
            app => app.status === "Offer"
        ).length;

    const saved =
        applications.filter(
            app => app.status === "Saved"
        ).length;


    document.getElementById("totalApplications")
        .textContent = total;

    document.getElementById("appliedCount")
        .textContent = applied;

    document.getElementById("interviewCount")
        .textContent = interviews;

    document.getElementById("offerCount")
        .textContent = offers;


    // Analytics
    document.getElementById("savedAnalytics")
        .textContent = saved;

    document.getElementById("appliedAnalytics")
        .textContent = applied;

    document.getElementById("interviewAnalytics")
        .textContent = interviews;

    document.getElementById("offerAnalytics")
        .textContent = offers;


    // Success rate
    let successful =
        interviews + offers;

    let rate = total > 0
        ? Math.round((successful / total) * 100)
        : 0;


    document.getElementById("successRate")
        .textContent = rate + "%";

    document.getElementById("successBar")
        .style.width = rate + "%";
}


// Display Reminders
function displayReminders() {

    const reminderList =
        document.getElementById("reminderList");

    reminderList.innerHTML = "";


    const reminders = [];


    applications.forEach(app => {

        if (app.followUp) {

            reminders.push({
                type: "Follow-up",
                date: app.followUp,
                job: app.jobTitle,
                company: app.company
            });

        }


        if (app.interviewDate) {

            reminders.push({
                type: "Interview",
                date: app.interviewDate,
                job: app.jobTitle,
                company: app.company
            });

        }

    });


    reminders.sort(
        (a, b) =>
        new Date(a.date) - new Date(b.date)
    );


    if (reminders.length === 0) {

        reminderList.innerHTML = `
            <div class="reminder">
                <strong>No reminders</strong>
                <p>
                    Add follow-up or interview dates
                    to see them here.
                </p>
            </div>
        `;

        return;
    }


    reminders.forEach(reminder => {

        const div =
            document.createElement("div");

        div.className = "reminder";

        div.innerHTML = `
            <strong>
                ${reminder.type}: ${escapeHTML(reminder.job)}
            </strong>

            <p>
                ${escapeHTML(reminder.company)}
            </p>

            <p>
                📅 ${reminder.date}
            </p>
        `;

        reminderList.appendChild(div);

    });
}


// Prevent HTML injection
function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// Close modal when clicking outside
window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("modal");

    if (event.target === modal) {
        closeModal();
    }

});


// Initial display
displayApplications();
displayReminders();
```
