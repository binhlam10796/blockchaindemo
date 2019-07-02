if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var userManagementSessionInstance = new web3.eth.Contract(UserManagementStorageABI, "0xadCe998Cfb3BD7C3E6b6Af4d1D7C7d2bB1aAFEC3");

// var date = new Date();
// var s = date.toString();

//create address random and unique
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;

function addUserManagement() {

    if ($('#idUserManagementForm').parsley().validate()) {
        this.console.log(temp);
        var address = randomAddress;
        var id = $("#id").val();
        var fullName = $("#fullName").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var gender = $("#gender").val();
        var dateOfBirth = $("#dateOfBirth").val();
        var isLocked = $("#isLocked").val();
        var date = Date.now();
        //var datetime = Date(date);
        var createdTime = date.toString();
        var modifiedTime = $("#modifiedTime").val();
        var idCardNo = $("#idCardNo").val();
        var idCardIssuePlace = $("#idCardIssuePlace").val();
        var phoneNumber = $("#phoneNumber").val();
        var job = $("#job").val();
        var userAddr = $("#userAddr").val();
        var batch = new web3.BatchRequest();
        batch.add(userManagementSessionInstance.methods.insertUser(address, id, fullName, email,
            password, gender, dateOfBirth)
            .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" },
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
        batch.add(userManagementSessionInstance.methods.insertUserDetail(address, isLocked, createdTime, modifiedTime,
            idCardNo, idCardIssuePlace)
            .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" },
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
            .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" },
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
                $("#addUser").hide();
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
}
// userManagementSessionInstance.methods.insertUserDetail(address, createdTime, modifiedTime,
//         idCardNo, idCardIssuePlace)
// userManagementSessionInstance.methods.insertUserDetailFlus(address, phoneNumber, job, userAddr)
// ,createdTime, modifiedTime, idCardNo,
// idCardIssuePlace, phoneNumber, phoneNumber, userAddr

$(window).on('load', function () {
    listUserManagement();

    // $('.table tbody').on('click', '.btn', function(){
    //     var currow = $(this).closest('tr');
    //     var col1 = currow.find('td:eq(0)').text();
    //     alert(col1);
    //     console.log(col1);
    // })

    var date = new Date();
    var s = date.toString();
    var temp = web3.eth.accounts.create();
    var address = temp.address
    this.console.log(temp.address);
    //     var date = new Date();
    // var s = date.toString();
    // var temp= web3.utils.keccak256(s);
    // this.console.log(temp);
    $(document).ready(function () {
        var table = '#listUserManager'
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
});


function listUserManagement() {
    var table = "";
    userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
                userManagementSessionInstance.methods.getUser(addr).call().then(function (result) {
                    userManagementSessionInstance.methods.getUserDetailMore(addr).call().then(function (result1) {
                        userManagementSessionInstance.methods.getUserDetailMoreMore(addr).call().then(function (result2) {
                            // console.log(result);
                            // console.log(result1);
                            // console.log(result2);
                            table += `<tr>
                                                <td>` + result[0] + `</td>
                                                <td>` + result[1] + `</td>
                                                <td>` + result[2] + `</td>
                                                <td>` + result[3] + `</td>
                                                <td>` + result[4] + `</td>
                                                <td>` + result[5] + `</td>
                                                <td>` + result[6] + `</td>
                                                <td>` + result1[0] + `</td>
                                                <td>` + result1[1] + `</td>
                                                <td>` + result1[2] + `</td>
                                                <td>` + result1[3] + `</td>
                                                <td>` + result1[4] + `</td>
                                                <td>` + result2[0] + `</td>
                                                <td>` + result2[1] + `</td>
                                                <td>` + result2[2] + `</td>
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
                                                    \`` + result[6] + `\`,

                                                    \`` + result1[0] + `\`,
                                                    \`` + result1[1] + `\`,
                                                    \`` + result1[2] + `\`,
                                                    \`` + result1[3] + `\`,
                                                    \`` + result1[4] + `\`,

                                                    \`` + result2[0] + `\`,
                                                    \`` + result2[1] + `\`,
                                                    \`` + result2[2] + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                                </td>
                                    </tr>`;
                            $("#listUserManager").find("tbody").html(table);
                        })

                    })
                })
            });
        }
    })
}

function createDeleteView(address) {
    var parag = `<p>` + address + `</p>`;
    $("#deleteModal").find(".modal-body").html(parag);
}

//delete quan ly nguoi dung
function deleteUserManagement() {
    // $('#listUserManager tbody').on('click', '.btn', function(){
    //     var currow = $(this).closest('tr');
    //     var col1 = currow.find('td:eq(0)').text();
    //     alert(col1);
    // })
    var address = $('#deleteModal .modal-body p').text();
    // var address = "0x4446B5dF39FAB2F3FAD857b13910C323786a0632";
    // console.log(address);
    // var numb = address.match(/\d/g);
    // console.log(numb);
    // var addr = numb.join();
    //if( deluser == address){
    userManagementSessionInstance.methods.deleteUser(address)
        .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" },
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
}

function createUpdateView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdateFullNameModal").find(".modal-body").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}

function createUpdateEmailView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdateEmailModal").find(".modal-body").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}
function createUpdateEmailView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdatePasswordModal").find(".modal-body").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}

function frontUpdateUserManagement(address, id, fullName, email, password, gender, dateOfBirth,
    isLocked, createdTime, modifiedTime,
    idCardNo, idCardIssuePlace, phoneNumber, job, userAddr) {
    var table = "";
    
                            table +=    `<tr>
                                            <th>Address</th>
                                            <td id="tdAddress">`+ address +`</td>

                                        <tr>
                                            <th>ID</th>
                                            <td id="tdId">`+ id + `</td>
                                        </tr>
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
                                            <td id="tdEmail">`+ email +`</td>
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
                                                onclick="createUpdateEmailView(\`` + address + `\`)" >
                                                <i class="far fa-edit"></i>
                                                    Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Giới tính</th>
                                            <td id="tdGender">`+ gender + `</td>
                                        </tr>
                                        <tr>
                                            <th>Ngày sinh</th>
                                            <td id="tdDateOfBirth">`+ dateOfBirth + `</td>
                                        </tr>
                                        <tr>
                                            <th>Khóa</th>
                                            <td id="tdIsLocked">`+ isLocked + `</td>
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
                                        </tr>
                                        <tr>
                                            <th>Số Nơi cấp CMND</th>
                                            <td id="tdIdCardIssuePlace">`+ idCardIssuePlace + `</td>
                                        </tr>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <td id="tdPhoneNumber">`+ phoneNumber + `</td>
                                        </tr>
                                        <tr>
                                            <th>Công việc</th>
                                            <td id="tdJob">`+ job + `</td>
                                        </tr>
                                        <tr>
                                            <th>Địa chỉ</th>
                                            <td id="tdUserAddr">`+ userAddr + `</td>
                                        </tr>`;

                            
                            $("#tableUpdateUser").find("tbody").html(table);

}


function updateUserManagement() {
    var address = $('#insertValueUpdateFullNameModal .modal-body p').text();
    var fullName = $('#valueUpdate').val();
    var modifiedTime = Date.now();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateFullName(address, fullName, modifiedTime)
            .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" },
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

function updateEmailUserManagement() {
    var address = $('#insertValueUpdateEmailModal .modal-body p').text();
    var email = $('#valueUpdateEmail').val();
    var modifiedTime = Date.now();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateEmail(address, email, modifiedTime)
            .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" },
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

function updateEmailUserManagement() {
    var address = $('#insertValueUpdatePasswordModal .modal-body p').text();
    var email = $('#valueUpdatePassword').val();
    var modifiedTime = Date.now();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateEmail(address, email, modifiedTime)
            .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" },
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