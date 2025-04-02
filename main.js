$(document).ready(function() {
    setTimeout(function() {
        $(".container").hide();
        $("#main-header, #employee-container, #employee-details,#filter-section").show();
        document.body.classList.remove('body_index');
        document.body.classList.add('body_main');

        const container = document.getElementById("employee-container");
        const detailsDiv = document.getElementById("employee-details");
        const filter = document.getElementById("filter-section");
        const checkbox_list = document.getElementById("checkbox-list");

        let selectedCompanies = []; // Array to store selected companies

        // Function to fetch and display employees based on selected companies
        function fetchAndDisplayEmployees(companies) {
            let url = 'http://127.0.0.1:30000/api/employees';
            if (companies && companies.length > 0) {
                url += '?companies=' + companies.join(','); // Append selected companies as query parameters
            }

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(allemploye => {
                    container.innerHTML = '';

                    allemploye.forEach((emp, index) => {
                        const card = document.createElement("div");
                        card.classList.add("employee-card");
                        card.dataset.index = index;

                        const imageContainer = document.createElement("div");
                        imageContainer.classList.add("image-container");

                        const img = document.createElement("img");
                        img.src = `${emp.photo}`;
                        img.alt = `${emp.fname}`;
                        imageContainer.appendChild(img);

                        const info = document.createElement("div");
                        info.classList.add("info");

                        const name = document.createElement("h3");
                        name.innerHTML = `${emp.fname} ${emp.lname}`;

                        const comp = document.createElement("p");
                        comp.innerHTML = `${emp.company}`;

                        info.appendChild(name);
                        info.appendChild(comp);

                        const colorBar = document.createElement("div");
                        colorBar.classList.add("color-bar");
                        colorBar.style.backgroundColor = `${emp.color}`;

                        card.appendChild(imageContainer);
                        card.appendChild(info);
                        card.appendChild(colorBar);
                        container.appendChild(card);
                    });

                    // ... (rest of your click event handlers for employee cards and close button) ...
                    
                $(container).on("click", function(event) {
                    const card = $(event.target).closest(".employee-card");

                    if (card.length) {
                        $(".employee-card.selected").removeClass("selected");
                        card.addClass("selected");

                        const index = card.data("index");
                        const employee = allemploye[index];

                        $("#details-photo").attr("src", employee.photo);
                        $("#details-name").text(`${employee.fname} ${employee.lname}`).css("color", employee.color);
                        $("#details-company").text(employee.company);
                        $("#details-address").text(employee.address);
                        $("#details-city").text(employee.city);
                        $("#details-country").text(employee.country);
                        $("#employee-details").css("border-color", employee.color);
                        $(".details-bar").css("background-color", employee.color);
                        $(container).animate({ marginRight: '300px' }, 100);
                        $(detailsDiv).addClass("show");
                    }
                });
                    const closeDetailsButton = document.getElementById("close-details");

                    $(closeDetailsButton).on("click", function() {
                        $(container).animate({ marginRight: '1px' }, 100);
                        $(detailsDiv).removeClass("show");
                        $(".employee-card.selected").removeClass("selected");
                    });
                })
                .catch(error => {
                    console.error('Error fetching employee data:', error);
                    container.innerHTML = '<p>Failed to load employee data.</p>';
                });
        }

        fetch('http://127.0.0.1:30000/api/companies')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(allcompanies => {
                allcompanies.forEach((comp, index) => {
                    const listItem = document.createElement('li');
                    const checkbox = document.createElement('input');
                    const label = document.createElement('label');

                    checkbox.type = 'checkbox';
                    checkbox.value = comp.name;
                    label.textContent = comp.name;
                    checkbox.classList.add('company-checkbox');

                    label.prepend(checkbox);
                    listItem.appendChild(label);
                    checkbox_list.appendChild(listItem);
                });

                // Event listener for checkbox changes
                $("#checkbox-list").on("change", ".company-checkbox", function() {
                    const companyName = $(this).val();

                    if (this.checked) {
                        selectedCompanies.push(companyName);
                    } else {
                        const index = selectedCompanies.indexOf(companyName);
                        if (index > -1) {
                            selectedCompanies.splice(index, 1);
                        }
                    }

                    fetchAndDisplayEmployees(selectedCompanies); // Fetch and display employees based on selected companies
                });
            })
            .catch(error => {
                console.error('Error fetching company data:', error);
                container.innerHTML = '<p>Failed to load company data.</p>';
            });

        fetchAndDisplayEmployees([]); // Fetch and display all employees initially
    }, 1500);
});