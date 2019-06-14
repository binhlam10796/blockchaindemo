if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var userManagementSessionInstance = new web3.eth.Contract(UserManagementStorageABI, "0x9751a8eD861Bd1835Ce818FA7B25f06756753902");
// var userManagementHistorySessionInstance = new web3.eth.Contract(UserManagementHistoryStorageABI, "0xadCe998Cfb3BD7C3E6b6Af4d1D7C7d2bB1aAFEC3");
//create address random and unique
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;
//0x8a6931B13B1EC63402bCcB5805BD5a5dD29F813e nam
//0x3779b844Eb35D6589132D6Bf83CA2B1E1515b183 tai
//0x4446B5dF39FAB2F3FAD857b13910C323786a0632 dlinh
//0xadCe998Cfb3BD7C3E6b6Af4d1D7C7d2bB1aAFEC3 okok
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
        var createdTime = new Date(Date.now()).toLocaleString();
        var modifiedTime = new Date(Date.now()).toLocaleString();
        // var date = Date.now();
        //var datetime = Date(date);
        // var createdTime = date.toString();
        // var modifiedTime = date.toString();
        // var createdTime = new Date(date.toLocalString());
        // var modifiedTime = new Date(date.toLocalString());
        // var modifiedTime = $("#modifiedTime").val();
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
    }
}


function onloadSelected() {
    $('.pagination').html('')
    var table = '#listUserManager';
    var trnum = 0;
    var maxRows = 1;
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

$(window).on('load', function () {
    listUserManagement();
    test();
    // $('.table tbody').on('click', '.btn', function(){
    //     var currow = $(this).closest('tr');
    //     var col1 = currow.find('td:eq(0)').text();
    //     alert(col1);
    //     console.log(col1);
    // })  
    $(document).ready(function () {
        var table = '#listUserManager';
        setTimeout(onloadSelected, 1000);

        $('#maxRowsListUserManagement').on('change', function () {
            // $('.pagination').html('')
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

        })

    });
});

function test() {
    
        var timeLine = "";
        
            userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
                for (let row = 0; row < count; row++) {
                    userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
                        userManagementSessionInstance.methods.getUser(addr).call().then(function (result) {
                            userManagementSessionInstance.methods.getUserDetailMore(addr).call().then(function (result1) {
                                userManagementSessionInstance.methods.getUserDetailMoreMore(addr).call().then(function (result2) {
                                    timeLine +=
                                                `
                                                <li class="time-label">
                                                    <span>` + result1[1] + `</span>
                                                </li>

                                                <li>
                                                    <i class="fa fa-user bg-aqua"></i>
                                                    <div class="timeline-item">
                                                        <span class="time">
                                                            <i class="fa fa-clock-o"></i> 5 mins ago </span>
                                                            <h3 class="timeline-header no-border">
                                                                <a href="#">` + result[2] + `</a> `+result[0]+ ` co `+result[1]+`
                                                                </h3>
                                                        
                                                    </div>
                                                </li>
                                                `
                                                ;
                                    $("#historyUsermanagement").find(".timeline").html(timeLine);
                                })

                            })
                        })
                    });
                }
            })
}
// $(window).on('load', function () {
//     $(document).ready(function () {
//          setTimeout(onloadSelected,1000);
//         var parag = "";
//         $('#historyUsermanagement').on('change', function () {
//             // $('.pagination').html('')
//             userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
//                 for (let row = 0; row < count; row++) {
//                     userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
//                         userManagementSessionInstance.methods.getUser(addr).call().then(function (result) {
//                             userManagementSessionInstance.methods.getUserDetailMore(addr).call().then(function (result1) {
//                                 userManagementSessionInstance.methods.getUserDetailMoreMore(addr).call().then(function (result2) {
//                                      parag += 
//                                                 `<liv>
//                                                     <span>` + createdTime + `</span>
//                                                 </liv>`   
//                                                     ;
//                                     $("#historyUsermanagement").find(".timeline").html(parag);
//                                 })

//                             })
//                         })
//                     });
//                 }
//             })


//         })

//     });
// });


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
                                                    \`` + result[6] + `\`,

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
    var address = $('#deleteModal .modal-body p').text();
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

// them address vao modal de get qua function update

//create view history
//inset 4<liv>
// function createHistoryView(createdTime) {
//     var parag="";
//     var parag = 
//                 `<liv>
//                     <span>` + createdTime + `</span>
//                 </liv>`   
//                     ;
//     $("#historyUsermanagement").find(".timeline").html(parag);
// }

//update fullname
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

function frontUpdateUserManagement(address, id, fullName, email, password, gender, dateOfBirth, userAddr,
    createdTime, modifiedTime, idCardNo, idCardIssuePlace, phoneNumber, isLocked) {
    var table = "";

    table += `<tr>
                                            <th>Address</th>
                                            <td id="tdAddress">`+ address + `</td>

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



//update fullname
function updateUserManagement() {
    var address = $('#insertValueUpdateFullNameModal .modal-body p').text();
    var fullName = $('#valueUpdate').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    // var modifiedTime = Date.now();
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

}

//update email
function updateEmailUserManagement() {
    var address = $('#insertValueUpdateEmailModal .modal-body p').text();
    var email = $('#valueUpdateEmail').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
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

}

function updatePasswordUserManagement() {
    var address = $('#insertValueUpdatePasswordModal .modal-body p').text();
    var password = $('#valueUpdatePassword').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updatePassword(address, password, modifiedTime)
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

}

function updateGenderUserManagement() {
    var address = $('#insertValueUpdateGenderModal .modal-body p').text();
    var gender = $('#valueUpdateGender').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateGender(address, gender, modifiedTime)
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
}

function updateDateOfBirthUserManagement() {
    var address = $('#insertValueUpdateDateOfBirthModal .modal-body p').text();
    var dateOfBirth = $('#valueUpdateDateOfBirth').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateDateOfBirth(address, dateOfBirth, modifiedTime)
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
}

function updateUserAddrUserManagement() {
    var address = $('#insertValueUpdateUserAddrModal .modal-body p').text();
    var userAddr = $('#valueUpdateUserAddr').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateUserAddr(address, userAddr, modifiedTime)
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
}

function updateIdCardNoUserManagement() {
    var address = $('#insertValueUpdateIdCardNoModal .modal-body p').text();
    var idCardNo = $('#valueUpdateIdCardNo').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateIdCardNo(address, idCardNo, modifiedTime)
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
}

function updateIdCardIssuePlaceUserManagement() {
    var address = $('#insertValueUpdateIdCardIssuePlaceModal .modal-body p').text();
    var idCardIssuePlace = $('#valueUpdateIdCardIssuePlace').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updateIdCardIssuePlace(address, idCardIssuePlace, modifiedTime)
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
}

function updatePhoneNumberUserManagement() {
    var address = $('#insertValueUpdatePhoneNumberModal .modal-body p').text();
    var phoneNumber = $('#valueUpdatePhoneNumber').val();
    var modifiedTime = new Date(Date.now()).toLocaleString();
    var batch = new web3.BatchRequest();
    batch.add(userManagementSessionInstance.methods.updatePhoneNumber(address, phoneNumber, modifiedTime)
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
}

// export table date to excel
function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}

function listHistory() {
    var table = "";
    userManagementSessionInstance.getPastEvents('SetUserManagementEvent',
        { fromBlock: 0 }).then(function (eventCer) {
            userManagementSessionInstance.getPastEvents('SetUserManagementAdditionEvent',
                { fromBlock: 0 }).then(function (eventAdd) {
                    userManagementSessionInstance.getPastEvents('SetUserManagementAdditionFlusEvent',
                        { fromBlock: 0 }).then(function (eventUser) {
                            for (var i = 0; i < eventCer.length; i++) {
                                for (var i = 0; i < eventAdd.length; i++) {
                                    for (var i = 0; i < eventUser.length; i++) {
                                        var res = eventCer[i];



                                        var address = res.returnValues._userAddress;
                                        var id = res.returnValues._userId;
                                        var fullName = res.returnValues._fullName;
                                        var email = res.returnValues._email;
                                        var password = res.returnValues._password;
                                        var gender = res.returnValues._gender;
                                        var dateOfBirth = res.returnValues._dateOfBirth;
                                        var isLocked = res.returnValues._isLocked;

                                        var res = eventAdd[i];
                                        var address1 = res.returnValues._userAddress;
                                        var createdTime = res.returnValues._createdTime;
                                        var modifiedTime = res.returnValues._modifiedTime;
                                        var idCardNo = res.returnValues._idCardNo;
                                        var idCardIssuePlace = res.returnValues._idCardIssuePlace;

                                        var res = eventUser[i];
                                        var address2 = res.returnValues._userAddress;
                                        var phoneNumber = res.returnValues._phoneNumber;
                                        var job = res.returnValues._job;
                                        var userAddr = res.returnValues._userAddr;
                                        // <td>` + address + `</td>

                                        table += `<tr>
                                                    <td>` + (parseInt(i) + 1) + `</td>
                                                    <td>` + address + `</td>
                                                    <td>` + id + `</td>
                                                    <td>` + fullName + `</td>
                                                    <td>` + email + `</td>
                                                    <td>` + password + `</td>
                                                    <td>` + gender + `</td>
                                                    <td>` + dateOfBirth + `</td>
                                                    <td>` + isLocked + `</td>

                                                    <td>` + createdTime + `</td>
                                                    <td>` + modifiedTime + `</td>
                                                    <td>` + idCardNo + `</td>
                                                    <td>` + idCardIssuePlace + `</td>

                                                    <td>` + phoneNumber + `</td>
                                                    <td>` + job + `</td>
                                                    <td>` + userAddr + `</td>

                                                    <td>
                                                        <button class="btn btn-danger btn-xs" onclick="deleteUserManagement()">
                                                            <i class="far fa-trash-alt"></i>
                                                            Xóa
                                                        </button>
                                                        <button class="btn btn-primary btn-xs">
                                                            <i class="far fa-edit"></i>
                                                            Sửa
                                                        </button>
                                                    </td>
                                                </tr>`;
                                    }
                                    $("#listUserManager").find("tbody").html(table);
                                }
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });
}

//export file excel
// function createTableWorkbook() {
//     var table = "";
//     var workbook = new $.ig.excel.Workbook($.ig.excel.WorkbookFormat.excel2007);
//                                 var sheet = workbook.worksheets().add('Report');
//                                 sheet.columns(0).setWidth(72, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(1).setWidth(160, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(2).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(3).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(4).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(4).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(6).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(7).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(8).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(9).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(10).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(11).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(12).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
//                                 sheet.columns(13).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);

//                                 // Create a to-do list table with columns for tasks and their priorities.
//                                 sheet.getCell('A1').value('Address');
//                                 sheet.getCell('B1').value('ID');
//                                 sheet.getCell('C1').value('Họ tên');
//                                 sheet.getCell('D1').value('Email');
//                                 sheet.getCell('E1').value('Mật khẩu');
//                                 sheet.getCell('F1').value('Giới tính');
//                                 sheet.getCell('G1').value('Ngày sinh');
//                                 sheet.getCell('H1').value('Địa chỉ');
//                                 sheet.getCell('I1').value('Thời gian tạo');
//                                 sheet.getCell('J1').value('Thời gian cập nhật');
//                                 sheet.getCell('K1').value('số CMND');
//                                 sheet.getCell('L1').value('Nơi cấp CMND');
//                                 sheet.getCell('M1').value('Số điện thoại');
//                                 sheet.getCell('N1').value('Khóa');
//                                 var table = sheet.tables().add('A1:N100', true);

//                                 // Specify the style to use in the table (this can also be specified as an optional 3rd argument to the 'add' call above).
//                                 table.style(workbook.standardTableStyles('TableStyleMedium2'))
//     userManagementSessionInstance.methods.getUserCount().call().then(function (count) {
//         for (let row = 0; row < count; row++) {
//             userManagementSessionInstance.methods.getUserAtIndex(row).call().then(function (addr) {
//                 userManagementSessionInstance.methods.getUser(addr).call().then(function (result) {
//                     userManagementSessionInstance.methods.getUserDetailMore(addr).call().then(function (result1) {
//                         userManagementSessionInstance.methods.getUserDetailMoreMore(addr).call().then(function (result2) {
//                             var arrayABC =["A", "B","C", "D", "E", "F", "G", "H", "I",
//                             "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//                             // var array123 =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 16, 17,
//                             // 18, 19, 20, 21, 22, 23, 24, 25, 26];
//                             // table += `<tr>
//                             //                     <td>` + result[0] + `</td>
//                             //                     <td>` + result[1] + `</td>
//                             //                     <td>` + result[2] + `</td>
//                             //                     <td>` + result[3] + `</td>
//                             //                     <td>` + result[4] + `</td>
//                             //                     <td>` + result[5] + `</td>
//                             //                     <td>` + result[6] + `</td>

//                             //                     <td>` + result2[2] + `</td>       
//                             //                     <td>` + result1[1] + `</td>
//                             //                     <td>` + result1[2] + `</td>
//                             //                     <td>` + result1[3] + `</td>
//                             //                     <td>` + result1[4] + `</td>
//                             //                     <td>` + result2[0] + `</td>
//                             //                     <td>` + result1[0] + `</td>

//                             //         </tr>`;
//                             var result0 = result[0];
//                             var result01 = result[1];
//                             var result2 = result[2];
//                             var result3 = result[3];
//                             var result4 = result[4];
//                             var result5 = result[5];
//                             var result6 = result[6];
//                             var result22 = result2[2];
//                             var result11= result1[1];
//                             var result12= result1[2];
//                             var result13= result1[3];
//                             var result14= result1[4];
//                             var result20= result2[0];
//                             var result10= result1[0];
//                             var mang =[result0, result01,result2,result3,result4,result5,result6,result22,result11,
//                                 result12, result13,result14,result20 ,result10]
//                                 // for( x= 0; x<= arrayABC.length; x++){
//                                 //     for( y= 2; y <= 100; y++){
//                                 //         sheet.getCell(arrayABC[x]+y).value(result[0]);
//                                 //     }
//                                 //}
//                                 for( i= 2; i< 10; i++){
//                                     for( j= 0; j<= mang.length; j++){
//                                         sheet.getCell('A'+i).value(mang[0]);
//                                     sheet.getCell('B'+i).value(mang[1]);
//                                     sheet.getCell('C'+i).value(mang[2]);
//                                     sheet.getCell('D'+i).value(mang[3]);
//                                     sheet.getCell('E'+i).value(mang[4]);
//                                     sheet.getCell('F'+i).value(mang[5]);
//                                     sheet.getCell('G'+i).value(mang[6]);
//                                     sheet.getCell('H'+i).value(mang[7]);
//                                     sheet.getCell('I'+i).value(mang[8]);
//                                     sheet.getCell('J'+i).value(mang[9]);
//                                     sheet.getCell('K'+i).value(mang[10]);
//                                     sheet.getCell('L'+i).value(mang[11]);
//                                     sheet.getCell('M'+i).value(mang[12]);
//                                     sheet.getCell('N'+i).value(mang[13]);
//                                     continue;
//                                     }
//                                 continue;

//                                 }


//                                 // Populate the table with data




//                                 // Sort the table by the Applicant column
//                                 //table.columns('Applicant').sortCondition(new $.ig.excel.OrderedSortCondition());

//                                 // Filter out the Approved applicants
//                                 //table.columns('Status').applyCustomFilter(new $.ig.excel.CustomFilterCondition($.ig.excel.ExcelComparisonOperator.notEqual, 'Approved'));

//                                 // Save the workbook
//                                 saveWorkbook(workbook, "Table.xlsx");
//                             // console.log(result);
//                             // console.log(result1);
//                             // console.log(result2);
//                         })

//                     })
//                 })
//             });



//         }
//     })
//     // Specify the style to use in the table (this can also be specified as an optional 3rd argument to the 'add' call above).

// }

// function saveWorkbook(workbook, name) {
//     workbook.save({ type: 'blob' }, function (data) {
//         saveAs(data, name);
//     }, function (error) {
//         alert('Error exporting: : ' + error);
//     });
// }

