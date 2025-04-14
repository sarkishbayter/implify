$(document).ready(function () {
    let allCompanies = [];
    let allEmployees = [];
    let selectedEmployee = null;
    const checkbox_list = document.getElementById("checkbox-list");
    document.body.classList.add('body_index');
    let currentPage=1;
    let employeesPerPage=7;
    $("#pagination").hide();

    // Function to delete employees based on id
    function deleteEmployee(employeeId) {
        fetch(`http://127.0.0.1:30000/api/employees/${employeeId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    console.log("Employee deleted successfully.");
                    $(".employee-card.selected").remove();
                    $("#close-details").click();
                    fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get(), 1);
                } else {
                    console.error("Failed to delete employee.");
                }
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
            });
    }

    // Function to display employees in each page 
    function displayEmployees(employees) { 
        const container = document.getElementById("employee-container");
        container.innerHTML = '';

        if (employees.length === 0) {
            container.innerHTML = "No Employees Found !!! ";
        } else {
            employees.forEach((emp, index) => {
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

                $(card).on("click", function () {
                    $(".employee-card.selected").removeClass("selected");
                    $(this).addClass("selected");
                    const employee = employees[index]; 
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
                    selectedEmployee = employee;
                    $(".edit-action").off("click").on("click", function () {
                        if (selectedEmployee) {
                            $("#main-section").hide();
                            $("#employee-details").hide();
                            $("#add-section p").text("Edit Employee");
                            $("#add-section").show();
                            editEmployee(selectedEmployee);
                            $(".add-action").prop("disabled", true);
                        } else {
                            alert("Please select an employee to edit.")
                        }
                    });
                });
            });

            const closeDetailsButton = document.getElementById("close-details");
            $(closeDetailsButton).on("click", function () {
                $(container).animate({ marginRight: '1px' }, 100);
                $("#employee-details").removeClass("show");
                $(".employee-card.selected").removeClass("selected");
            });
        }
    }

    // Function to fetch and display employees based on selected companies
    function fetchEmployees(companies, page = 1) { 
        let url = 'http://127.0.0.1:30000/api/employees/list';
        const requestData={
            page:page,
            limit:employeesPerPage
        };
        if (companies && companies.length > 0) {
            requestData.companies=companies;
        }

        fetch(url,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => { 
                displayEmployees(data.employees);
                displayPagination(data.total); 
                currentPage = page;
                const buttons = document.getElementById("pagination").querySelectorAll('button');
                buttons.forEach(btn => {
                  if (parseInt(btn.textContent) === page) {
                    btn.classList.add('active');
                  } else {
                    btn.classList.remove('active');
                  }
                });

            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                document.getElementById("employee-container").innerHTML = '<p>Failed to load employee data.</p>';
            });
    }

    // Function to display pagination buttons
    function displayPagination(totalEmployees) { 
        const paginationContainer = document.getElementById("pagination");
        if (paginationContainer) {
            paginationContainer.innerHTML = "";
            const totalPages = Math.ceil(totalEmployees / employeesPerPage);

            if (totalPages > 1) {
                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement("button");
                    pageButton.textContent = i;
                    pageButton.addEventListener("click", function () {
                        const buttons = paginationContainer.querySelectorAll('button');
                        buttons.forEach(btn => btn.classList.remove('active'));
                        pageButton.classList.add('active');
                        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get(), i); // Send page number
                    });
                    paginationContainer.appendChild(pageButton);
                    if (i === 1 && currentPage === 1) {
                        pageButton.classList.add('active');
                    }
                }
                $("#pagination").show();
            } else {
                $("#pagination").hide();
            }
        }
    }

    // Function to add employee
    function addEmployee(employeeId) {
        $('#add-section form').off('submit').on('submit', function (event) {
            event.preventDefault();
            const formData = {
                fname: $('#fname').val(),
                lname: $('#lname').val(),
                id: $('#id').val(),
                companyId: $('#companie-dropdown').val(),
                address: $('#address').val(),
                city: $('#city').val(),
                country: $('#country').val(),
                photo: $('#photo').val(),
            };
            if (formData.fname == "") {
                alert("First name can not be empty !!");
            } else {
                let url = 'http://127.0.0.1:30000/api/employees/add';
                let method = 'POST';
                if (employeeId) {
                    url += `/${employeeId}`;
                    method = 'PUT';
                }
                fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error(`Failed to ${employeeId ? 'update' : 'add'} employee.`);
                        }
                    })
                    .then(data => {
                        console.log(`Employee ${employeeId ? 'updated' : 'added'}:`, data.message);
                        $('#add-section form')[0].reset();
                        alert(`Employee ${employeeId ? 'updated' : 'added'} successfully!`);
                        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get());
                        $("#main-section").show();
                        $("#employee-details").show();
                        $(".add-action").prop("disabled", false);
                        $("#add-section").hide();
                        selectedEmployee = null;
                    })
                    .catch(error => {
                        console.error(`Error ${employeeId ? 'updating' : 'adding'} employee:`, error);
                        alert(`Failed to ${employeeId ? 'update' : 'add'} employee.`);
                    });
            }
        });
    }

    //function to edit an employee
    function editEmployee(employee) {
        $('#fname').val(employee.fname);
        $('#lname').val(employee.lname);
        $('#id').val(employee.employeeId).prop('readonly', true);
        $('#companie-dropdown').val(employee.companyId);
        $('#address').val(employee.address);
        $('#city').val(employee.city);
        $('#country').val(employee.country);
        $('#photo').val(employee.photo);

        const dropDown = document.getElementById('companie-dropdown');
        dropDown.innerHTML = "";

        allCompanies.forEach(comp => {
            const option = document.createElement('option');
            option.value = comp.id;
            option.text = comp.name;
            if (comp.name === employee.company) {
                option.selected = true;
            }
            dropDown.appendChild(option);
        });
        addEmployee(employee.employeeId);
        $("#close-details").click();
    }

    // function to fetch companies
    function fetch_companies() {
        fetch('http://127.0.0.1:30000/api/companies')
            .then(response => {
                console.log("Companies response:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                allCompanies = data; // Store companies globally
                allCompanies.forEach(comp => {
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
    }

    // login function
    function login(username, password) {

        fetch('http://127.0.0.1:30000/api/login', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || 'Login failed'); });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log("login succesfully");
                    $("#login-page").hide();
                    $(".container").show();
                    $("#login-message").hide();
                    setTimeout(function () {
                        document.body.classList.remove('body_index');
                        document.body.classList.add('body_main');
                        $(".container").hide();
                        $("#main-header, #employee-container, #employee-details, #filter-section").show();
                        $("#pagination").show();
                        fetch_companies();
                        fetchEmployees([], 1);
                    }, 1000);

                }
                else {
                    $("#login-message").text(data.message).show();
                    $("#password").val('');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                $("#login-message").text(error.message).show();
                $("#password").val('');
            });
    }


    // ... Event listeners ...
    $("#login-button").off("click").on("click", function () {
        event.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();
        login(username, password);
    });

    $(".delete-action").off("click").on("click", function () {
        const employeeId = $("#employee-details").data("employeeId");
        if (employeeId) {
            if (confirm("Are you sure you want to delete this employee?")) {
                deleteEmployee(employeeId);
            }
        } else {
            console.error("Employee ID not found.");
        }
    });

    $("#checkbox-list").off("change", ".company-checkbox").on("change", ".company-checkbox", function () {
        const selectedCompanyNames = $(".company-checkbox:checked").map(function () {
            return $(this).val();
        }).get();
        fetchEmployees(selectedCompanyNames,1);
    });

    $(".add-action").off("click").on("click", function () {
        $("#main-section").hide();
        $("#employee-details").hide();
        $("#add-section p").text("Add Employee");
        $("#add-section").show();
        const dropDown = document.getElementById('companie-dropdown');
        dropDown.innerHTML = "";
        allCompanies.forEach(comp => {
            const option = document.createElement('option');
            option.value = comp.id;
            option.text = comp.name;
            dropDown.appendChild(option);
        });
        addEmployee();
    });

    $(".back-to-main").off("click").on("click", function () {
        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get());
        $("#main-section").show();
        $("#employee-details").show();
        $("#add-section").hide();
        $(".add-action").prop("disabled", false);
        $('#add-section form')[0].reset();
        selectedEmployee = null;
    });

    setTimeout(() => {
        $(".container").hide();
        $("#login-page").show();
    }, 1500);


});