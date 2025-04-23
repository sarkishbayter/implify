$(document).ready(function () {
    let allCompanies = [];
    let allIds = [];
    let allcolors = [];
    let selectedEmployee = null;
    const checkbox_list = document.getElementById("checkbox-list");
    document.body.classList.add('body_index');
    let currentPage = 1;
    let employeesPerPage = 7;
    $("#pagination").hide();
    $("#sign-up-page").hide();
    $("#reset-pass-page").hide();
    $("#forgot-button").prop("disabled", true);

    function checkUsernameInput() {
        const username = $("#username").val();
        if (username.trim() !== "") {
            $("#forgot-button").prop("disabled", false);
        } else {
            $("#forgot-button").prop("disabled", true);
        }
    }
    checkUsernameInput();
    $("#username").on("input", checkUsernameInput);

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
                            $(".add-companie-button").prop("disabled", true);
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
        const requestData = {
            page: page,
            limit: employeesPerPage
        };
        if (companies && companies.length > 0) {
            requestData.companies = companies;
        }

        fetch(url, {
            method: 'POST',
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

    // Function to display pagination buttons with next and previous
    function displayPagination(total) {
        const paginationContainer = document.getElementById("pagination");
        if (paginationContainer) {
            paginationContainer.innerHTML = "";
            const totalPages = Math.ceil(total / employeesPerPage);

            if (totalPages > 1) {
                const prevButton = document.createElement("button");
                prevButton.textContent = "Previous";
                prevButton.classList.add("prev-button");
                prevButton.addEventListener("click", () => {
                    if (currentPage > 1) {
                        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get(), currentPage - 1);
                    }
                });
                paginationContainer.appendChild(prevButton);

                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement("button");
                    pageButton.textContent = i;
                    pageButton.addEventListener("click", function () {
                        const buttons = paginationContainer.querySelectorAll('button');
                        buttons.forEach(btn => btn.classList.remove('active'));
                        pageButton.classList.add('active');
                        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get(), i);
                    });
                    paginationContainer.appendChild(pageButton);
                    if (i === 1 && currentPage === 1) {
                        pageButton.classList.add('active');
                    }
                }

                const nextButton = document.createElement("button");
                nextButton.textContent = "Next";
                nextButton.classList.add("next-button");
                nextButton.addEventListener("click", () => {
                    if (currentPage < totalPages) {
                        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get(), currentPage + 1);
                    }
                });
                paginationContainer.appendChild(nextButton);

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
                    url = `http://127.0.0.1:30000/api/employees/edit/${employeeId}`;
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
                        $(".add-companie-button").prop("disabled", false);
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
        const checkbox_list = document.getElementById("checkbox-list");
        checkbox_list.innerHTML = ""; // Clear the existing list
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
                        $("#add-companie").hide();
                        fetchEmployees([], 1);
                    }, 1000);
                    fetch_companies();
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

    //function to add new companies
    function addCompanies() {
        $('#add-companie form').off('submit').on('submit', function (event) {
            event.preventDefault();
            const formData = {
                name: $("#comp-name").val(),
                color: $("#comp-color").val()
            };

            if (formData.name == "") {
                alert("company name can not be empty !!");
            } else {
                let url = 'http://127.0.0.1:30000/api/companies/add';
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error(errorData.error || 'Failed to add company');
                        });
                    }
                    return response.json();
                })
                    .then(data => {
                        console.log(`company added`);
                        $('#add-companie form')[0].reset();
                        alert(`company added successfully !`);
                        fetch_companies();
                        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get());
                        $("#main-section").show();
                        $("#employee-details").show();
                        $(".add-action").prop("disabled", false);
                        $("#add-companie").hide();
                        selectedEmployee = null;
                    })
                    .catch(error => {
                        console.error(`Error adding company:`, error);
                        alert(error);
                    });
            }
        });
    }
    //function to search employee by name
    function searchEmployee(employeeName) {

        fetch(`http://127.0.0.1:30000/api/employees/search/${encodeURIComponent(employeeName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                displayEmployees(data);
                displayPagination(data.length);
                currentPage = 1;
                const buttons = document.getElementById("pagination").querySelectorAll('button');
                buttons.forEach(btn => {
                    if (parseInt(btn.textContent) === 1) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                document.getElementById("employee-container").innerHTML = '<p>Search Field Should Not Be Empty !!  </p>';
                $("#pagination").hide();
            });

    }
    //function to sign up
    function signUp() {
        $("#sign-up-page form").off("submit").on("submit", function (event) {
            event.preventDefault();
            const username = $("#sign-up-username").val();
            const pass1 = $("#password1").val();
            const pass2 = $("#password2").val();

            const formData = {
                username: username,
                password: pass1,
                confirm_password: pass2
            };


            fetch('http://127.0.0.1:30000/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error(errorData.message || "Signup failed");

                        });
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Signup successful:");
                    console.log("Signup successful:", data);
                    $("#sign-up-message").text(data.message).show();
                    $("#sign-up-page").hide();
                    $("#login-page").show();
                    $("#sign-up-username").val("");
                    $("#password1").val("");
                    $("#password2").val("");
                })
                .catch(error => {
                    console.error("Signup failed:", error);
                    $("#sign-up-message").text(error.message).show();
                });
        });
    }

    // function reset password 
    function resetPassword(username) {
        $("#reset-username").val(username);
        $("#reset-pass-page form").off("submit").on("submit", function (event) {
            event.preventDefault();
            changed_user = $("#reset-username").val();

            const user = changed_user;
            const pass1 = $("#reset-password1").val();
            const pass2 = $("#reset-password2").val();

            const formData = {
                username: user,
                password: pass1,
                confirm_password: pass2
            };


            fetch('http://127.0.0.1:30000/api/reset', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error(errorData.message || "reset failed");

                        });
                    }
                    return response.json();
                })
                .then(data => {
                    alert("reset successful:");
                    console.log("reset successful:", data);
                    $("#reset-message").text(data.message).show();
                    $("#reset-pass-page").hide();
                    $("#login-page").show();
                    $("#username").val("");
                    $("#password1").val("");
                    $("#login-message").val("");
                    $("#reset-username").val("");
                    $("#reset-password1").val("");
                    $("#reset-password2").val("");
                })
                .catch(error => {
                    console.error("reset failed:", error);
                    $("#reset-message").text(error.message).show();
                });

        });

    }

    // ... Event listeners ...
    $("#forgot-button").off("click").on("click", function () {
        event.preventDefault();
        username = $("#username").val();
        $("#login-page").hide();
        $("#reset-pass-page").show();
        resetPassword(username);
    });

    $("#sign-up-button").off("click").on("click", function () {
        $("#login-page").hide();
        $("#sign-up-page").show();
        $("#sign-up-message").text("").hide();
        signUp();
    });

    $("#search-button").on("click", function () {
        event.preventDefault();
        employeeName = $("#search-employee").val();
        searchEmployee(employeeName);


    });

    $(".add-companie-button").off("click").on("click", function () {
        $(".add-action").prop("disabled", true);
        $("#main-section").hide();
        $("#employee-details").hide();
        $("#add-companie").show();
        addCompanies();
    });

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
        fetchEmployees(selectedCompanyNames, 1);
    });

    $(".add-action").off("click").on("click", function () {
        $("#main-section").hide();
        $("#employee-details").hide();
        $("#add-section p").text("Add Employee");
        $("#add-companie").hide();
        $("#add-section").show();
        $(".add-companie-button").prop("disabled", true);
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
        $("#add-companie").hide();
        $(".add-action").prop("disabled", false);
        $(".add-companie-button").prop("disabled", false);
        $('#add-section form')[0].reset();
        selectedEmployee = null;
    });

    $(".back-button").off("click").on("click", function () {
        $("#sign-up-page").hide();
        $("#reset-pass-page").hide();
        $("#login-page").show();
        $("#reset-message").val("");
        $("#sign-up-message").val("");
    });

    $("#search-back").off("click").on("click",function () {
        $("#search-employee").val("");
        fetchEmployees($(".company-checkbox:checked").map(function () { return $(this).val(); }).get());
        $("#main-section").show();
        $("#employee-details").show();
        $("#add-companie").hide();
        $("#add-section").hide();
        $(".add-companie-button").prop("disabled", false);
        $(".add-action").prop("disabled", false);

    });

    setTimeout(() => {
        $(".container").hide();
        $("#login-page").show();
        $("#sign-up-page").hide();

    }, 1500);


});