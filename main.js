$(document).ready(function() {
    $("#add-section").hide();
    // Function to delete employees based on id
    function deleteEmployee(employeeId) {
        fetch(`http://127.0.0.1:30000/api/employees/${employeeId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    console.log("Employee deleted successfully.");
                    $(".employee-card.selected").remove();
                    $("#close-details").click();
                    fetchAndDisplayEmployees($(".company-checkbox:checked").map(function() { return $(this).val(); }).get());
                } else {
                    console.error("Failed to delete employee.");
                }
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
            });
    }

    // Function to fetch and display employees based on selected companies
    function fetchAndDisplayEmployees(companies) {
        let url = 'http://127.0.0.1:30000/api/employees';
        if (companies && companies.length > 0) {
            url += '?companies=' + companies.join(',');
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(allemploye => {
                const container = document.getElementById("employee-container");
                container.innerHTML = '';
                if (allemploye.length === 0) {
                    container.innerHTML = "No Employees Found !!! ";
                } else {
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

                        $(card).on("click", function() {
                            $(".employee-card.selected").removeClass("selected");
                            $(this).addClass("selected");

                            const employee = allemploye[index];
                            $("#employee-details").data("employeeId", employee.employeeId);
                            $("#details-photo").attr("src", employee.photo);
                            $("#details-name").text(`${employee.fname} ${employee.lname}`).css("color", employee.color);
                            $("#details-company").text(employee.company);
                            $("#details-address").text(employee.address);
                            $("#details-city").text(employee.city);
                            $("#details-country").text(employee.country);
                            $("#employee-details").css("border-color", employee.color);
                            $(".details-bar").css("background-color", employee.color);
                            $(container).animate({ marginRight: '300px' }, 100);
                            $("#employee-details").addClass("show");
                        });
                    });

                    const closeDetailsButton = document.getElementById("close-details");
                    $(closeDetailsButton).on("click", function() {
                        $(container).animate({ marginRight: '1px' }, 100);
                        $("#employee-details").removeClass("show");
                        $(".employee-card.selected").removeClass("selected");
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                document.getElementById("employee-container").innerHTML = '<p>Failed to load employee data.</p>';
            });
    }

    function addEmployee() {
        $("#main-section").hide();
        $("#add-section").show();

        $('#add-section form').off('submit').on('submit', function(event) {
            event.preventDefault();

            const formData = {
                fname: $('#fname').val(),
                lname: $('#lname').val(),
                id: $('#id').val(),
                companyId: $('#companyId').val(),
                address: $('#address').val(),
                city: $('#city').val(),
                country: $('#country').val(),
                photo: $('#photo').val(),
            };

            fetch('http://127.0.0.1:30000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to add employee.');
                    }
                })
                .then(data => {
                    console.log('Employee added:', data.message);
                    $('#add-section form')[0].reset(); //Clear the form fields
                    alert('Employee added successfully!');
                    fetchAndDisplayEmployees($(".company-checkbox:checked").map(function() { return $(this).val(); }).get());
                    
                })
                .catch(error => {
                    console.error('Error adding employee:', error);
                    alert('Failed to add employee.');
                });
        });
    }
    

    setTimeout(function() {
        $(".container").hide();
        $("#main-header, #employee-container, #employee-details, #filter-section").show();
        document.body.classList.remove('body_index');
        document.body.classList.add('body_main');

        const checkbox_list = document.getElementById("checkbox-list");
        let allcompanies = [];

        // Fetch company data
        fetch('http://127.0.0.1:30000/api/companies')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                allcompanies = data;
                allcompanies.forEach(comp => {
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
            })
            .catch(error => {
                console.error('Error fetching company data:', error);
                document.getElementById("employee-container").innerHTML = '<p>Failed to load company data.</p>';
            });

        // Add event listener for delete button
        $(".delete-action").off("click").on("click", function() {
            const employeeId = $("#employee-details").data("employeeId");
            if (employeeId) {
                if (confirm("Are you sure you want to delete this employee?")) {
                    deleteEmployee(employeeId);
                }
            } else {
                console.error("Employee ID not found.");
            }
        });

        // Add event listener for checkbox changes
        $("#checkbox-list").off("change", ".company-checkbox").on("change", ".company-checkbox", function() {
            const selectedCompanyNames = $(".company-checkbox:checked").map(function() {
                return $(this).val();
            }).get();
            fetchAndDisplayEmployees(selectedCompanyNames);
        });
        // event listener to add button 
        $(".add-action").off("click").on("click", function() {
            addEmployee();
        });
        $(".back-to-main").off("click").on("click", function() {
            fetchAndDisplayEmployees($(".company-checkbox:checked").map(function() { return $(this).val(); }).get());
            $("#main-section").show();
            $("#add-section").hide();
            $('#add-section form')[0].reset(); //clear form
        });
        
        fetchAndDisplayEmployees([]);
    }, 1500);
});