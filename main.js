$(document).ready(function() {
    setTimeout(function() {
        $(".container").hide();
        $("#main-header, #employee-container, #employee-details, #filter-section").show();
        document.body.classList.remove('body_index');
        document.body.classList.add('body_main');

        const container = document.getElementById("employee-container");
        const detailsDiv = document.getElementById("employee-details");
        const checkbox_list = document.getElementById("checkbox-list");

        let allcompanies = []; 

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
                    container.innerHTML = '';
                    if(allemploye.length==0){
                        container.innerHTML="No Employees Found !!! ";
                    }
                    else{
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
                            $("#employee-details").data("employeeId",employee.employeeId);
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
                        });
                    });
        
                    const closeDetailsButton = document.getElementById("close-details");
                    //close button
                    $(closeDetailsButton).on("click", function() {
                        $(container).animate({ marginRight: '1px' }, 100);
                        $(detailsDiv).removeClass("show");
                        $(".employee-card.selected").removeClass("selected");
                    });
                }
        
                })
                .catch(error => {
                    console.error('Error fetching employee data:', error);
                    container.innerHTML = '<p>Failed to load employee data.</p>';
                });

                //delete button
                //.off("click"):remove existing listeners
                $(".delete-action").off("click").on("click",function(){
                    const employeeId=$("#employee-details").data("employeeId");
                    if (employeeId) {
                        if (confirm("Are you sure you want to delete this employee?")) {
                            deleteEmployee(employeeId);
                        }
                    } else {
                        console.error("Employee ID not found.");
                    }
                });
        }
        // function to delete employees based on id 
        function deleteEmployee(employeeId) {
            fetch(`http://127.0.0.1:30000/api/employees/${employeeId}`, { method: 'DELETE', })
            .then(response => {
                if (response.ok) {
                    console.log("Employee deleted successfully.");
                    $(".employee-card.selected").remove();
                    $("#close-details").click();
                    //refresh the employee list
                    fetchAndDisplayEmployees($(".company-checkbox:checked").map(function() {return $(this).val();}).get());
                } else {
                    console.error("Failed to delete employee.");
                }
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
            });
        }


        fetch('http://127.0.0.1:30000/api/companies')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                allcompanies = data; // Assign fetched data to allcompanies
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

                //check any checkbox changes 
                $("#checkbox-list").off("change", ".company-checkbox").on("change", ".company-checkbox", function() {
                    const selectedCompanyNames = $(".company-checkbox:checked").map(function() {
                        return $(this).val();
                    }).get();

                    fetchAndDisplayEmployees(selectedCompanyNames);

                });
            })
            .catch(error => {
                console.error('Error fetching company data:', error);
                container.innerHTML = '<p>Failed to load company data.</p>';
            });

        fetchAndDisplayEmployees([]);
    }, 1500);
});