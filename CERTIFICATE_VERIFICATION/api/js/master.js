if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var userManagementSessionInstance = new web3.eth.Contract(UserManagementStorageABI, "0x5aB05BC7EAc1355B3ff1B5a748A75a2BfAC39e80");
var SchoolManagementSessionInstance = new web3.eth.Contract(SchoolStorageABI, "0xA5D96Dc92586be9DC36F377C4bF933ce6cb65dEc");
//create address random and unique
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;

//create users
function addUserManagement() {
    if ($('#idUserManagementForm').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {
            //var address = randomAddress;
            var account = result[0];
            var address = $("#id").val();
            var fullName = $("#fullName").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var gender = $("#gender").val();
            var dateOfBirth = $("#dateOfBirth").val();
            var isLocked = $("#isLocked").val();

            var createdTime = new Date(Date.now()).toString();
            var modifiedTime = new Date(Date.now()).toString();
            var idCardNo = $("#idCardNo").val();
            var idCardIssuePlace = $("#idCardIssuePlace").val();
            var phoneNumber = $("#phoneNumber").val();
            var job = $("#job").val();
            var userAddr = $("#userAddr").val();
            var batch = new web3.BatchRequest();
            // var batch = new web3.createBatch();
            batch.add(userManagementSessionInstance.methods.insertUser(address, fullName, email,
                password, gender, dateOfBirth)
                .send({ from: account },
                    function (error, result) {
                        try {
                            if (error.message.includes("User denied transaction signature")) {
                                // handle the "error" as a rejection
                                alert('Đã từ chối dịch vụ.');
                                location.reload();
                            }
                        }
                        catch (err) {
                            console.log("Đã fix lỗi.");
                        }
                    }
                ));
            batch.add(userManagementSessionInstance.methods.insertUserDetail(address, isLocked, createdTime, modifiedTime,
                idCardNo, idCardIssuePlace)
                .send({ from: account },
                    function (error, result) {
                        console.log(address);
                        try {
                            if (error.message.includes("User denied transaction signature")) {
                                // handle the "error" as a rejection
                                alert('Đã từ chối dịch vụ.');
                                location.reload();
                            }
                        }
                        catch (err) {
                            console.log("Đã fix lỗi.");
                        }
                    }
                ));
            batch.add(userManagementSessionInstance.methods.insertUserDetailFlus(address, phoneNumber, job, userAddr)
                .send({ from: account },
                    function (error, result) {
                        try {
                            if (error.message.includes("User denied transaction signature")) {
                                // handle the "error" as a rejection
                                alert('Đã từ chối dịch vụ.');
                                location.reload();
                            }
                        }
                        catch (err) {
                            console.log("Đã fix lỗi.");
                        }
                    }
                )
                .on('transactionHash', (hash) => {
                    $("#addUsers").hide();
                    alert("Vui lòng chờ xử lý giao dịch!");
                })
                .on('receipt', (receipt) => {
                    alert("Thêm thành công!");
                    location.reload();
                })
                .on('confirmation', (confirmationNumber, receipt) => {

                })
                .on('error', console.err)
            );
            // function history
            try {
                batch.execute();
                if (error.message.includes("JSONRPC method should be specified for params:")) {
                    console.log("Đã fix lỗi.");
                }
            }
            catch (err) {
                console.log("Đã fix lỗi.");
            }
        });
    }
}

// pagination users management
function onloadSelected() {
    $('.pagination').html('')
    var table = '#listUserManager';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#listUserManager tbody tr').length;
    // console.log(totalRows);
    $(table + ' tr:gt(0)').each(function () {
        trnum++
        if (trnum > maxRows) {
            $(this).hide()
        }
        if (trnum <= maxRows) {
            $(this).show()
        }
    })
    if (totalRows > maxRows) {
        var pagenum = Math.ceil(totalRows / maxRows)
        for (var i = 1; i <= pagenum;) {
            $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('.pagination li:first-child').addClass('active')
    $('.pagination li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('.pagination li').removeClass('active')
        $(this).addClass('active')
        $(table + ' tr:gt(0)').each(function () {
            trIndex++
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide()
            } else {
                $(this).show()
            }
        })
    })
}

// pagination school management
function pag() {
    $('.paginationSchool').html('')
    var table = '#listSchoolManager';
    var trnum = 0;
    var maxRows = 10;
    var totalRows = $('#listSchoolManager tbody tr').length;
    // console.log(totalRows);
    $(table + ' tr:gt(0)').each(function () {
        trnum++
        if (trnum > maxRows) {
            $(this).hide()
        }
        if (trnum <= maxRows) {
            $(this).show()
        }
    })
    if (totalRows > maxRows) {
        var pagenum = Math.ceil(totalRows / maxRows)
        for (var i = 1; i <= pagenum;) {
            $('.paginationSchool').append('<li data-page="' + i + '">\<span>' + i++ + ' <span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('.paginationSchool li:first-child').addClass('active')
    $('.paginationSchool li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('.paginationSchool li').removeClass('active')
        $(this).addClass('active')
        $(table + ' tr:gt(0)').each(function () {
            trIndex++
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide()
            } else {
                $(this).show()
            }
        })
    })
}

//load page
$(window).on('load', function () {
    listUserManagement();
    // history();
    $(document).ready(function () {
        var table = '#listUserManager';
        setTimeout(onloadSelected, 5000);

        $('#maxRowsListUserManagement').on('change', function () {
            $('.pagination').html('')
            var trnum = 0;
            var maxRows = parseInt($(this).val())
            var totalRows = $(table + ' tbody tr').length
            $(table + ' tr:gt(0)').each(function () {
                trnum++
                if (trnum > maxRows) {
                    $(this).hide()
                }
                if (trnum <= maxRows) {
                    $(this).show()
                }
            })
            if (totalRows > maxRows) {
                var pagenum = Math.ceil(totalRows / maxRows)
                for (var i = 1; i <= pagenum;) {
                    $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('.pagination li:first-child').addClass('active')
            $('.pagination li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.pagination li').removeClass('active')
                $(this).addClass('active')
                $(table + ' tr:gt(0)').each(function () {
                    trIndex++
                    if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                        $(this).hide()
                    } else {
                        $(this).show()
                    }
                })
            })

        })
    });

    listSchoolManagement();
    $(document).ready(function () {
        var table = '#listSchoolManager';
        setTimeout(pag, 4000);

        $('#listschoolpt').on('change', function () {
            $('.paginationSchool').html('')
            var trnum = 0;
            var maxRows = parseInt($(this).val())
            var totalRows = $(table + ' tbody tr').length
            $(table + ' tr:gt(0)').each(function () {
                trnum++
                if (trnum > maxRows) {
                    $(this).hide()
                }
                if (trnum <= maxRows) {
                    $(this).show()
                }
            })
            if (totalRows > maxRows) {
                var pagenum = Math.ceil(totalRows / maxRows)
                for (var i = 1; i <= pagenum;) {
                    $('.paginationSchool').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('.paginationSchool li:first-child').addClass('active')
            $('.paginationSchool li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.paginationSchool li').removeClass('active')
                $(this).addClass('active')
                $(table + ' tr:gt(0)').each(function () {
                    trIndex++
                    if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                        $(this).hide()
                    } else {
                        $(this).show()
                    }
                })
            })
        })
    });
    historyUsers();
    historySchool()
});

//sort table
function sortTable(table, order) {
    var asc = order === 'asc',
        tbody = table.find('tbody');

    tbody.find('tr').sort(function (a, b) {
        if (asc) {
            return $('td:first', a).text().localeCompare($('td:first', b).text(), false, { numeric: true });
        } else {
            return $('td:first', b).text().localeCompare($('td:first', a).text(), false, { numeric: true });
        }
    }).appendTo(tbody);
}
//danh sach nguoi dung
function listUserManagement() {
    var table = "";
    userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
                userManagementSessionInstance.methods.getUser(addr).call().then(function (result) {
                    userManagementSessionInstance.methods.getUserDetailMore(addr).call().then(function (result1) {
                        userManagementSessionInstance.methods.getUserDetailMoreMore(addr).call().then(function (result2) {
                            var createdTime = Date(result1[1])
                            var modifiedTime = Date(result1[2])
                            table += `<tr>
                                                <td>` + (parseInt(row) + 1) + `</td>
                                                <td>` + result[0] + `</td>
                                                <td>` + result[1] + `</td>
                                                <td>` + result[2] + `</td>
                                                <td>` + result[3] + `</td>
                                                <td>` + result[4] + `</td>
                                                <td>` + result[5] + `</td>
                                                <td>` + result2[2] + `</td>  

                                                <td>` + result1[1] + `</td>
                                                <td>` + result1[2] + `</td>
                                                <td>` + result1[3] + `</td>
                                                <td>` + result1[4] + `</td>
                                                <td>` + result2[0] + `</td>
                                                <td>` + result1[0] + `</td>
                                                <td>
                                                <button class="btn btn-danger btn-xs" 
                                                data-toggle="modal" data-target="#deleteModal" 
                                                onclick="createDeleteView(\`` + result[0] + `\`)" >
                                                <i class="far fa-trash-alt"></i>
                                                    Xóa
                                                </button>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#updateFrontUserManagement"
                                                onclick="frontUpdateUserManagement(
                                                    
                                                    \`` + result[0] + `\`,
                                                    \`` + result[1] + `\`,
                                                    \`` + result[2] + `\`,
                                                    \`` + result[3] + `\`,
                                                    \`` + result[4] + `\`,
                                                    \`` + result[5] + `\`,
                                                    

                                                    \`` + result2[2] + `\`,
                                                    \`` + result1[1] + `\`,
                                                    \`` + result1[2] + `\`,
                                                    \`` + result1[3] + `\`,
                                                    \`` + result1[4] + `\`,
                                                    \`` + result2[0] + `\`,
                                                    \`` + result1[0] + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                                
                                                </td>
                                    </tr>`;

                            $("#listUserManager").find("tbody").html(table);
                            document.getElementById("btnSort").click();


                        })

                    })
                })
            });
        }
    })
}

//modal delete
function createDeleteView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#deleteModal").find(".modal-body").html(parag);
}

//delete quan ly nguoi dung
function deleteUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#deleteModal .modal-body p').text();
        userManagementSessionInstance.methods.deleteUser(address)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            // handle the "error" as a rejection
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                })
            .on('transactionHash', (hash) => {
                $("#deleteModal").hide();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('receipt', (receipt) => {
                location.reload();
                alert('Thành công.');
                console.log(receipt);
            })
            .on('error', console.log("có lỗi MetaMask"));
        //else{ alert('fail')}
        //}
    })
}
//delete all users
function deleteAllUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
            for (let row = 0; row < count; row++) {
                userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
                    userManagementSessionInstance.methods.getUser(addr).call().then(function (result) {
                        userManagementSessionInstance.methods.getUserDetailMore(addr).call().then(function (result1) {
                            userManagementSessionInstance.methods.getUserDetailMoreMore(addr).call().then(function (result2) {
                                userManagementSessionInstance.methods.deleteUser(result[0])
                                    .send({ from: account },
                                        function (error, result) {
                                            try {
                                                if (error.message.includes("User denied transaction signature")) {
                                                    // handle the "error" as a rejection
                                                    alert('Đã từ chối dịch vụ.');
                                                    location.reload();
                                                }
                                            }
                                            catch (err) {
                                                console.log("Đã fix lỗi.");
                                            }
                                        })
                                    .on('transactionHash', (hash) => {
                                        $("#deleteModal").hide();
                                    })
                                    .on('confirmation', (confirmationNumber, receipt) => {

                                    })
                                    .on('receipt', (receipt) => {
                                        location.reload();
                                        alert('Thành công.');
                                        console.log(receipt);
                                    })
                                    .on('error', console.log("có lỗi MetaMask"));
                            })

                        })
                    })
                });
            }
        })
    })
}


//view update

function createUpdateView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateFullNameModal").find(".modal-body").html(parag);
}

function createUpdateEmailView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateEmailModal").find(".modal-body").html(parag);
}

function createUpdatePasswordView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdatePasswordModal").find(".modal-body").html(parag);
}

function createUpdateGenderView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateGenderModal").find(".modal-body").html(parag);
}

function createUpdateDateOfBirthView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateDateOfBirthModal").find(".modal-body").html(parag);
}

function createUpdateUserAddrView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateUserAddrModal").find(".modal-body").html(parag);
}

function createUpdateIdCardNoView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateIdCardNoModal").find(".modal-body").html(parag);
}

function createUpdateIdCardIssuePlaceView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateIdCardIssuePlaceModal").find(".modal-body").html(parag);
}

function createUpdatePhoneNumberView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdatePhoneNumberModal").find(".modal-body").html(parag);
}
//modal update
function frontUpdateUserManagement(address, fullName, email, password, gender, dateOfBirth, userAddr,
    createdTime, modifiedTime, idCardNo, idCardIssuePlace, phoneNumber, isLocked) {
    var table = "";

    table += `<tr>
                                            <th>Address</th>
                                            <td id="tdAddress">`+ address + `</td>

                                        
                                        <tr>
                                            <th>Họ tên</th>
                                            <td id="tdFullName">`+ fullName + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateFullNameModal"
                                                onclick="createUpdateView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td id="tdEmail">`+ email + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateEmailModal"
                                                onclick="createUpdateEmailView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Mật khẩu</th>
                                            <td id="tdPassword">`+ password + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdatePasswordModal"
                                                onclick="createUpdatePasswordView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Giới tính</th>
                                            <td id="tdGender">`+ gender + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateGenderModal"
                                                onclick="createUpdateGenderView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Ngày sinh</th>
                                            <td id="tdDateOfBirth">`+ dateOfBirth + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateDateOfBirthModal"
                                                onclick="createUpdateDateOfBirthView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td id="tdUserAddr">`+ userAddr + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateUserAddrModal"
                                                onclick="createUpdateUserAddrView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <th>Thời gian tạo</th>
                                            <td id="tdCreatedTime">`+ createdTime + `</td>
                                        </tr>
                                        <tr>
                                            <th>Thời gian thay đổi</th>
                                            <td id="tdModifiedTime">`+ modifiedTime + `</td>
                                        </tr>
                                        <tr>
                                            <th>Số CMND</th>
                                            <td id="tdIdCardNo">`+ idCardNo + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateIdCardNoModal"
                                                onclick="createUpdateIdCardNoView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Số Nơi cấp CMND</th>
                                            <td id="tdIdCardIssuePlace">`+ idCardIssuePlace + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" data-toggle="modal" 
                                                data-target="#insertValueUpdateIdCardIssuePlaceModal"
                                                onclick="createUpdateIdCardIssuePlaceView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td id="tdPhoneNumber">`+ phoneNumber + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" data-toggle="modal"
                                                data-target="#insertValueUpdatePhoneNumberModal"
                                                onclick="createUpdatePhoneNumberView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Khóa</th>
                                            <td id="tdIsLocked">`+ isLocked + `</td>
                                        </tr>`;


    $("#tableUpdateUser").find("tbody").html(table);

}

//update 

function updateUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdateFullNameModal .modal-body p').text();
        var fullName = $('#valueUpdate').val();
        var modifiedTime = new Date(Date.now()).toString();
        // var modifiedTime = Date.now();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updateFullName(address, fullName, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdateFullNameModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updateEmailUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdateEmailModal .modal-body p').text();
        var email = $('#valueUpdateEmail').val();
        var modifiedTime = new Date(Date.now()).toString();
        // var modifiedTime = new Date(Date.now()).toLocaleString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updateEmail(address, email, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdateEmailModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updatePasswordUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdatePasswordModal .modal-body p').text();
        var password = $('#valueUpdatePassword').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updatePassword(address, password, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdatePasswordModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updateGenderUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdateGenderModal .modal-body p').text();
        var gender = $('#valueUpdateGender').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updateGender(address, gender, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdateGenderModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updateDateOfBirthUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdateDateOfBirthModal .modal-body p').text();
        var dateOfBirth = $('#valueUpdateDateOfBirth').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updateDateOfBirth(address, dateOfBirth, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdateDateOfBirthModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updateUserAddrUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdateUserAddrModal .modal-body p').text();
        var userAddr = $('#valueUpdateUserAddr').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updateUserAddr(address, userAddr, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdateUserAddrModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updateIdCardNoUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdateIdCardNoModal .modal-body p').text();
        var idCardNo = $('#valueUpdateIdCardNo').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updateIdCardNo(address, idCardNo, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdateIdCardNoModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updateIdCardIssuePlaceUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdateIdCardIssuePlaceModal .modal-body p').text();
        var idCardIssuePlace = $('#valueUpdateIdCardIssuePlace').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updateIdCardIssuePlace(address, idCardIssuePlace, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdateIdCardIssuePlaceModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

function updatePhoneNumberUserManagement() {
    web3.eth.getAccounts(function (error, result) {
        var account = result[0];
        var address = $('#insertValueUpdatePhoneNumberModal .modal-body p').text();
        var phoneNumber = $('#valueUpdatePhoneNumber').val();
        var modifiedTime = new Date(Date.now()).toString();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.updatePhoneNumber(address, phoneNumber, modifiedTime)
            .send({ from: account },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#insertValueUpdatePhoneNumberModal").hide();
                $("#updateFrontUserManagement").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Cập nhật hoàn thành.");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã fix lỗi.");
            }
        }
        catch (err) {
            console.log("Đã fix lỗi.");
        }
    })
}

//Ham xu li thoi gian
function cutStringDate(str) {
    var n = str.search(",");
    var result = str.slice(0, n);
    return result;
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
// Jan 2019
function formatDate(date) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    var minutes = date.getMinutes();
    var hours = date.getHours()
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + hours + ':' + minutes;
}
//format date
function tg(date) {
    var timeLabel = formatDate(new Date(cutStringDate(date)));
    return timeLabel;
}

function relativeTime(date) {
    var date1 = moment(date).fromNow();
    return date1;
}

function timeLine(id, thoigian) {
    var history = "";
    history += `<li class="time-label">
                    <span class="bg-red">`+ tg(thoigian) + `</span>
                </li>
                <li>
                <i class="fa fa-user bg-aqua"></i>
                <div class="timeline-item">
                <span class="time">
                    <i class="fa fa-clock-o"></i>`+ relativeTime(thoigian) + `</span>
                        <h3 class="timeline-header no-border">
                            <a href="#" data-toggle="modal" data-target="#viewUserModal" onclick="viewUser('`+ id + `')">` + id + `</a> </h3>
                </div>
                </li>`;
    $("#historyUsermanagement").find(".timeline").html(history);
}


//new history user
function historyUsers() {
    var listHistory = "";
    userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
        for (let row = 0; row < count ; row++) {
            userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
                userManagementSessionInstance.methods.getUser(addr).call().then(function (result) {
                    userManagementSessionInstance.methods.getUserDetailMore(addr).call().then(function (result1) {
                        userManagementSessionInstance.methods.getUserDetailMoreMore(addr).call().then(function (result2) {
                        listHistory +=  
                            `
                            <tr>
                                <td id=sortHistory onclick="sortTable($('#listHistory'),'desc')"
                                    style="display: none !important">
                                    ` + (parseInt(row) + 1) + `</td>
                                <td>
                                    <div class="tab-pane" >
                                        <section class="content">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <ul id="btnTimeLine" class="timeline">
                                                        <li class="time-label">
                                                            <span> `+ tg(result1[1]) +` </span>
                                                        </li>

                                                        <li>
                                                            <i class="fa fa-user bg-aqua"></i>
                                                            <div class="timeline-item">
                                                                    <span class="time">
                                                                    <i class="fa fa-clock-o"></i>`+ relativeTime(result1[1]) + `</span>
                                                                    <h3 class="timeline-header no-border" >
                                                                        <a href="#" data-toggle="modal"
                                                                            data-target="#viewUserModal" 
                                                                            onclick="viewUser('`+ result[0] + `')">
                                                                            `+ result[0] + `
                                                                        </a>
                                                                        đã được thêm.
                                                                    </h3>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </td>
                            </tr>

                            `
                            $("#listHistory").find("tbody").html(listHistory);
                            document.getElementById("sortHistory").click();
                        })

                    })
                })
            });
        }
    })
}

//new history school
function historySchool() {
    var listHistorySchool = "";
    SchoolManagementSessionInstance.methods.getSchoolCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            SchoolManagementSessionInstance.methods.getSchoolAtIndex(row).call().then(function (addr) {
                SchoolManagementSessionInstance.methods.getSchool(addr).call().then(function (result) {
                    SchoolManagementSessionInstance.methods.getSchoolAddition(addr).call().then(function (result1) {
                        listHistorySchool +=  `
                        <tr>
                            <td id=sortHistorySchool onclick="sortTable($('#listHistorySchool'),'desc')"
                                style="display: none !important">
                                ` + (parseInt(row) + 1) + `
                            </td>
                            <td>
                                <div class="tab-pane" >
                                    <section class="content">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <ul id="btnTimeLine" class="timeline">
                                                    <li class="time-label">
                                                        <span> `+ tg(result1[0]) +` </span>
                                                    </li>

                                                    <li>
                                                        <i class="fa fa-user bg-aqua"></i>
                                                        <div class="timeline-item">
                                                                <span class="time">
                                                                <i class="fa fa-clock-o"></i>`+ relativeTime(result1[0]) + `</span>
                                                                <h3 class="timeline-header no-border" >
                                                                    <a href="#" data-toggle="modal"
                                                                        data-target="#viewUserModal" 
                                                                        onclick="viewSchool('`+ result[0] + `')">
                                                                        `+ result[0] + `
                                                                    </a>
                                                                    đã được thêm.
                                                                </h3>
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </td>
                        </tr>

                        `
                        $("#listHistorySchool").find("tbody").html(listHistorySchool);
                        document.getElementById("sortHistorySchool").click();

                    })
                })
            });
        }
    })
}
//xem chi nguoi dung
function viewUser(id) {
    console.log(id);
    // userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
    //     for (let row = count-1; row >=0; row--) {
    //         userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
    userManagementSessionInstance.methods.getUser(id).call().then(function (result) {
        userManagementSessionInstance.methods.getUserDetailMore(id).call().then(function (result1) {
            userManagementSessionInstance.methods.getUserDetailMoreMore(id).call().then(function (result2) {
                var table = `<tr>
                                            <th>ID</th>
                                            <td>` + result[0] + `</td>
                                        <tr>
                                            <th>Họ và tên</th>
                                            <td>` + result[1] + `</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>` + result[2] + `</td>
                                        </tr>
                                        <tr>
                                            <th>Giới tính</th>
                                            <td>` + result[4] + `</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td>` + result2[0] + `</td>
                                        </tr>`;
                $("#viewUser").find("tbody").html(table);
            })
        })
    })
    //         })
    //     }
    // })

}
//xem chi tiet truong hoc
function viewSchool(id) {
    console.log(id);
    SchoolManagementSessionInstance.methods.getSchool(id).call().then(function (result) {
        SchoolManagementSessionInstance.methods.getSchoolAddition(id).call().then(function (result1) {
            var table = `<tr>
                                        <th>ID</th>
                                        <td>` + result[0] + `</td>
                                    <tr>
                                        <th>Họ và tên</th>
                                        <td>` + result[1] + `</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>` + result[2] + `</td>
                                    </tr>
                                    <tr>
                                        <th>Giới tính</th>
                                        <td>` + result[3] + `</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại</th>
                                        <td>` + result[4] + `</td>
                                    </tr>`;
            $("#viewSchool").find("tbody").html(table);
        })
    })

}
// export table date to excel
function exportExcel() {
    $("#listUserManager").table2excel({
        exclude: ".noExl",
        name: "Report",
        filename: "Danh_sach_nguoi_dung", //do not include extension
        fileext: ".xls",
        preserveColors: true // file extension
    });
}

//School management
function addSchool() {
    if ($('#formaddschool').parsley().validate()) {
        // this.console.log(temp);
        var temp = web3.eth.accounts.create();
        var randomAddress = temp.address;
        var address = randomAddress;
        // var id = $("#id").val();
        var fullName = $("#nameShool").val();
        var SchoolAddr = $("#addr").val();
        var email = $("#emailSchool").val();
        var fax = $("#fax").val();
        var phoneNumber = $("#phone").val();
        var createdTime = new Date(Date.now()).toString();
        var modifiedTime = new Date(Date.now()).toString();
        // var createdTime = Date.now();
        // var modifiedTime = Date.now();
        var isLocked = $("#isLockedSchool").val();
        // var date = Date.now();
        // var idCardNo = $("#idCardNo").val();
        // var idCardIssuePlace = $("#idCardIssuePlace").val();
        //var datetime = Date(date);
        // var job = $("#job").val();
        // var password = $("#password").val();
        // var gender = $("#gender").val();
        // var dateOfBirth = $("#dateOfBirth").val();
        var batch = new web3.BatchRequest();
        batch.add(SchoolManagementSessionInstance.methods.insertSchool(address, fullName, SchoolAddr, email,
            fax, phoneNumber)
            .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
                function (error, result) {
                    console.log(address);
                    try {
                        if (error.message.includes("School denied transaction signature")) {
                            // handle the "error" as a rejection
                            alert('Đã hủy giao dịch.');
                            // location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi giao dịch 1.");
                    }
                }
            ));
        batch.add(SchoolManagementSessionInstance.methods.insertSchoolAddition(address, createdTime, modifiedTime, isLocked)
            .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
                function (error, result) {
                    try {
                        if (error.message.includes("School denied transaction signature")) {
                            // handle the "error" as a rejection
                            alert('Đã từ chối dịch vụ.');
                            // location.reload();
                        }
                    }
                    catch (err) {
                        console.log("Đã fix lỗi giao dịch 2.");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#addSchool").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Success!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err)
        );
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("Đã thêm.");
            }
        }
        catch (err) {
            console.log("Đợi thêm.");
        }
    }
}

$(window).on('load', function () {
    listSchoolManagement();
    $(document).ready(function () {
        var table = '#listSchoolManager';
        setTimeout(pag, 4000);

        $('#listschoolpt').on('change', function () {
            $('.pagination').html('')
            var trnum = 0;
            var maxRows = parseInt($(this).val())
            var totalRows = $(table + ' tbody tr').length
            $(table + ' tr:gt(0)').each(function () {
                trnum++
                if (trnum > maxRows) {
                    $(this).hide()
                }
                if (trnum <= maxRows) {
                    $(this).show()
                }
            })
            if (totalRows > maxRows) {
                var pagenum = Math.ceil(totalRows / maxRows)
                for (var i = 1; i <= pagenum;) {
                    $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('.pagination li:first-child').addClass('active')
            $('.pagination li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.pagination li').removeClass('active')
                $(this).addClass('active')
                $(table + ' tr:gt(0)').each(function () {
                    trIndex++
                    if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                        $(this).hide()
                    } else {
                        $(this).show()
                    }
                })
            })
        })
    });
});

function listSchoolManagement() {
    var table = "";
    SchoolManagementSessionInstance.methods.getSchoolCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            SchoolManagementSessionInstance.methods.getSchoolAtIndex(row).call().then(function (addr) {
                SchoolManagementSessionInstance.methods.getSchool(addr).call().then(function (result) {
                    SchoolManagementSessionInstance.methods.getSchoolAddition(addr).call().then(function (result1) {
                        // console.log(result);
                        // console.log(result1);
                        table += `<tr>
                                        <td>` + (parseInt(row) + 1) + `</td>
                                        <td>` + result[1] + `</td>
                                        <td>` + result[3] + `</td>
                                        <td>` + result[2] + `</td>
                                        <td>` + result[4] + `</td>
                                        <td>` + result[5] + `</td>
                                        <td>` + result1[0] + `</td>
                                        <td>` + result1[1] + `</td>
                                        <td>
                                        <button class="btn btn-danger btn-xs" 
                                        data-toggle="modal" data-target="#deleteModalSchool" 
                                        onclick="createDeleteViewSchool(\`` + result[0] + `\`)" >
                                        <i class="far fa-trash-alt"></i>
                                            Xóa
                                        </button>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#updateModalSchool"
                                        onclick="frontUpdateSchoolManagement(
                                            
                                            \`` + result[0] + `\`,
                                            \`` + result[1] + `\`,
                                            \`` + result[3] + `\`,
                                            \`` + result[2] + `\`,
                                            \`` + result[4] + `\`,
                                            \`` + result[5] + `\`,

                                            \`` + result1[1] + `\`,
                                            \`` + result1[0] + `\`,
                                            \`` + result1[2] + `\`)" >
                                        <i class="far fa-edit"></i>
                                            Sửa
                                        </button>
                                        </td>
                                        <td>` + result1[2] + `</td>
                                    </tr>`;
                        $("#listSchoolManager").find("tbody").html(table);
                        document.getElementById("btnSortSchool").click();
                    })
                })
            });
        }
    })
}
function createDeleteViewSchool(address) {
    var parag = `<p>` + address + `</p>`;
    $("#deleteModalSchool").find(".modal-body2").html(parag);
}
//delete quan ly truong School
function deleteSchoolManagement() {
    var address = $('#deleteModalSchool .modal-body p').text();
    SchoolManagementSessionInstance.methods.deleteSchool(address)
        .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
            function (error, result) {
                try {
                    if (error.message.includes("School denied transaction signature")) {
                        // handle the "error" as a rejection
                        alert('Đã từ chối dịch vụ.');
                        location.reload();
                    }
                }
                catch (err) {
                    console.log("Đã fix lỗi.");
                }
            })
        .on('transactionHash', (hash) => {
            $("#deleteModalSchool").hide();
        })
        .on('confirmation', (confirmationNumber, receipt) => {

        })
        .on('receipt', (receipt) => {
            location.reload();
            alert('Thành công.');
            console.log(receipt);
        })
        .on('error', console.log("có lỗi MetaMask"));
}

function createUpdateViewSchool(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateFullNameModalSchool").find(".modal-body2").html(parag);
}

function createUpdateEmailViewSchool(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateEmailModalSchool").find(".modal-body2").html(parag);
}
function createUpdateAddrViewSchool(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateAddrModalSchool").find(".modal-body2").html(parag);
}
function createUpdateFaxViewSchool(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateFaxModalSchool").find(".modal-body2").html(parag);
}
function createUpdatePhoneViewSchool(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdatePhoneModalSchool").find(".modal-body2").html(parag);
}
function createUpdateisLockViewSchool(address) {
    var parag = `<p>` + address + `</p>`;
    $("#insertValueUpdateisLockModalSchool").find(".modal-body2").html(parag);
}

function frontUpdateSchoolManagement(address, fullName, SchoolAddr, email, fax, phoneNumber, createdTime, modifiedTime, isLocked) {
    var table = "";
    table += `<tr>
                    <th>Address</th>
                    <td id="tdAddress">`+ address + `</td>
                    <td></td>
                <tr>
                    <th>Tên Trường</th>
                    <td id="tdFullName">`+ fullName + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateFullNameModalSchool"
                        onclick="createUpdateViewSchool(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Địa chỉ</th>
                    <td id="tdSchoolAddr">`+ SchoolAddr + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateAddrModalSchool"
                        onclick="createUpdateAddrViewSchool(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td id="tdEmail">`+ email + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateEmailModalSchool"
                        onclick="createUpdateEmailViewSchool(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Fax</th>
                    <td id="tdFax">`+ fax + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateFaxModalSchool"
                        onclick="createUpdateFaxViewSchool(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Số điện thoại</th>
                    <td id="tdPhoneNumber">`+ phoneNumber + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdatePhoneModalSchool"
                        onclick="createUpdatePhoneViewSchool(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>
                <tr>
                <tr>
                    <th>Trạng thái</th>
                    <td id="tdisLocked">`+ isLocked + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateisLockModalSchool"
                        onclick="createUpdateisLockViewSchool(\`` + address + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                <tr>
                <tr>
                    <th>Thời gian tạo</th>
                    <td id="tdCreatedTime">`+ createdTime + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Thời gian thay đổi</th>
                    <td id="tdModifiedTime">`+ modifiedTime + `</td>
                    <td></td>
                </tr>`;
    $("#tableUpdateSchool").find("tbody").html(table);
}

function updateNameSchoolManagement() {
    var address = $('#insertValueUpdateFullNameModalSchool .modal-body p').text();
    var fullName = $('#valueUpdateName').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateFullName(address, fullName, modifiedTime)
        .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
            function (error, result) {
                try {
                    if (error.message.includes("School denied transaction signature")) {
                        alert('Đã từ chối dịch vụ.');
                        location.reload();
                    }
                }
                catch (err) {
                    console.log("Đã fix lỗi.");
                }
            }
        )
        .on('transactionHash', (hash) => {
            $("#insertValueUpdateFullNameModalSchool").hide();
            $("#updateFrontSchoolManagement").hide();
            alert("Vui lòng chờ xử lý giao dịch!");
        })
        .on('receipt', (receipt) => {
            alert("Thành Công!");
            location.reload();
        })
        .on('confirmation', (confirmationNumber, receipt) => {

        })
        .on('error', console.err)
    );
    try {
        batch.execute();
        if (error.message.includes("JSONRPC method should be specified for params:")) {
            console.log("Đã fix lỗi.");
        }
    }
    catch (err) {
        console.log("Đã fix lỗi.");
    }

}

function updateEmailSchoolManagement() {
    var address = $('#insertValueUpdateEmailModalSchool .modal-body p').text();
    var email = $('#valueUpdateEmail').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateEmail(address, email, modifiedTime)
        .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
            function (error, result) {
                try {
                    if (error.message.includes("School denied transaction signature")) {
                        alert('Đã từ chối dịch vụ.');
                        location.reload();
                    }
                }
                catch (err) {
                    console.log("Đã fix lỗi.");
                }
            }
        )
        .on('transactionHash', (hash) => {
            $("#insertValueUpdateEmailModalSchool").hide();
            $("#updateFrontSchoolManagement").hide();
            alert("Vui lòng chờ xử lý giao dịch!");
        })
        .on('receipt', (receipt) => {
            alert("Success!");
            location.reload();
        })
        .on('confirmation', (confirmationNumber, receipt) => {

        })
        .on('error', console.err)
    );
    try {
        batch.execute();
        if (error.message.includes("JSONRPC method should be specified for params:")) {
            console.log("Đã fix lỗi.");
        }
    }
    catch (err) {
        console.log("Đã fix lỗi.");
    }
}

function updateAddrSchoolManagement() {
    var address = $('#insertValueUpdateAddrModalSchool .modal-body p').text();
    var addr = $('#valueUpdateAddr').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateAddr(address, addr, modifiedTime)
        .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
            function (error, result) {
                try {
                    if (error.message.includes("School denied transaction signature")) {
                        alert('Đã từ chối dịch vụ.');
                        location.reload();
                    }
                }
                catch (err) {
                    console.log("Đã fix lỗi.");
                }
            }
        )
        .on('transactionHash', (hash) => {
            $("#insertValueUpdateAddrModalSchool").hide();
            $("#updateFrontSchoolManagement").hide();
            alert("Vui lòng chờ xử lý giao dịch!");
        })
        .on('receipt', (receipt) => {
            alert("Success!");
            location.reload();
        })
        .on('confirmation', (confirmationNumber, receipt) => {

        })
        .on('error', console.err)
    );
    try {
        batch.execute();
        if (error.message.includes("JSONRPC method should be specified for params:")) {
            console.log("Đã fix lỗi.");
        }
    }
    catch (err) {
        console.log("Đã fix lỗi.");
    }

}

function updateFaxSchoolManagement() {
    var address = $('#insertValueUpdateFaxModalSchool .modal-body p').text();
    var fax = $('#valueUpdateFax').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateFax(address, fax, modifiedTime)
        .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
            function (error, result) {
                try {
                    if (error.message.includes("School denied transaction signature")) {
                        alert('Đã từ chối dịch vụ.');
                        location.reload();
                    }
                }
                catch (err) {
                    console.log("Đã fix lỗi.");
                }
            }
        )
        .on('transactionHash', (hash) => {
            $("#insertValueUpdateFaxModalSchool").hide();
            $("#updateFrontSchoolManagement").hide();
            alert("Vui lòng chờ xử lý giao dịch!");
        })
        .on('receipt', (receipt) => {
            alert("Success!");
            location.reload();
        })
        .on('confirmation', (confirmationNumber, receipt) => {

        })
        .on('error', console.err)
    );
    try {
        batch.execute();
        if (error.message.includes("JSONRPC method should be specified for params:")) {
            console.log("Đã fix lỗi.");
        }
    }
    catch (err) {
        console.log("Đã fix lỗi.");
    }
}

function updatePhoneSchoolManagement() {
    var address = $('#insertValueUpdatePhoneModalSchool .modal-body p').text();
    var phone = $('#valueUpdatePhone').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updatePhone(address, phone, modifiedTime)
        .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
            function (error, result) {
                try {
                    if (error.message.includes("School denied transaction signature")) {
                        alert('Đã từ chối dịch vụ.');
                        location.reload();
                    }
                }
                catch (err) {
                    console.log("Đã fix lỗi.");
                }
            }
        )
        .on('transactionHash', (hash) => {
            $("#insertValueUpdatePhoneModalSchool").hide();
            $("#updateFrontSchoolManagement").hide();
            alert("Vui lòng chờ xử lý giao dịch!");
        })
        .on('receipt', (receipt) => {
            alert("Success!");
            location.reload();
        })
        .on('confirmation', (confirmationNumber, receipt) => {

        })
        .on('error', console.err)
    );
    try {
        batch.execute();
        if (error.message.includes("JSONRPC method should be specified for params:")) {
            console.log("Đã fix lỗi.");
        }
    }
    catch (err) {
        console.log("Đã fix lỗi.");
    }
}

function updateisLockSchoolManagement() {
    var address = $('#insertValueUpdateisLockModalSchool .modal-body p').text();
    var isLocked = $('#valueUpdateisLock').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateIslocked(address, isLocked, modifiedTime)
        .send({ from: "0x3dd54937fD67590403103FE4DA767c0e071Ec86e" },
            function (error, result) {
                try {
                    if (error.message.includes("School denied transaction signature")) {
                        alert('Đã từ chối dịch vụ.');
                        location.reload();
                    }
                }
                catch (err) {
                    console.log("Đã fix lỗi.");
                }
            }
        )
        .on('transactionHash', (hash) => {
            $("#insertValueUpdateisLockModalSchool").hide();
            $("#updateFrontSchoolManagement").hide();
            alert("Vui lòng chờ xử lý giao dịch!");
        })
        .on('receipt', (receipt) => {
            alert("Success!");
            location.reload();
        })
        .on('confirmation', (confirmationNumber, receipt) => {

        })
        .on('error', console.err)
    );
    try {
        batch.execute();
        if (error.message.includes("JSONRPC method should be specified for params:")) {
            console.log("Đã fix lỗi.");
        }
    }
    catch (err) {
        console.log("Đã fix lỗi.");
    }

}



