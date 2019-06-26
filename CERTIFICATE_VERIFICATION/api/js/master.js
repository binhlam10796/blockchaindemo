if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var SchoolManagementSessionInstance = new web3.eth.Contract(SchoolStorageABI, "0x99440E9b6Fc1ff3a7E0E16C90822A55038c62F60");
// var date = new Date();
// var s = date.toString();
function sortTable(table, order) {
    var asc   = order === 'asc',
        tbody = table.find('tbody');
        
    tbody.find('tr').sort(function(a, b) {
        if (asc) {
            return $('td:first', a).text().localeCompare($('td:first', b).text(), false, {numeric: true});
        } else {
            return $('td:first', b).text().localeCompare($('td:first', a).text(), false, {numeric: true});
        }
    }).appendTo(tbody);
}
//create address random and unique
var temp = web3.eth.accounts.create();
var randomAddress = temp.address;
//0x8a6931B13B1EC63402bCcB5805BD5a5dD29F813e nam
//0x3779b844Eb35D6589132D6Bf83CA2B1E1515b183 tai
//0x4446B5dF39FAB2F3FAD857b13910C323786a0632 dlinh
//0x444bf7B18fFb184b4a262eF96fb1735A8183979F dc
function addSchool() {
    if ($('#formaddschool').parsley().validate()) {
        // this.console.log(temp);
        var address = randomAddress;
        // var id = $("#id").val();
        var fullName = $("#name").val();
        var userAddr = $("#addr").val();
        var email = $("#email").val();
        var fax = $("#fax").val();
        var phoneNumber = $("#phone").val();
        var createdTime = new Date(Date.now()).toString();
        var modifiedTime = new Date(Date.now()).toString();
        // var createdTime = Date.now();
        // var modifiedTime = Date.now();
        var isLocked = $("#isLocked").val();
        // var date = Date.now();
        // var idCardNo = $("#idCardNo").val();
        // var idCardIssuePlace = $("#idCardIssuePlace").val();
        //var datetime = Date(date);
        // var job = $("#job").val();
        // var password = $("#password").val();
        // var gender = $("#gender").val();
        // var dateOfBirth = $("#dateOfBirth").val();
        var batch = new web3.BatchRequest();
        batch.add(SchoolManagementSessionInstance.methods.insertSchool(address, fullName, userAddr, email,
            fax, phoneNumber)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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
                        console.log("Đã fix lỗi giao dịch 1.");
                    }
                }
            ));
        batch.add(SchoolManagementSessionInstance.methods.insertSchoolAddition(address, createdTime, modifiedTime, isLocked)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            // handle the "error" as a rejection
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
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
// Đây nè 2
function pag(){
    $('.pagination').html('')
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
                $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + ' <span class="sr-only">(current)</span> </span>\ </li>').show()
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
    listSchoolManagement();
    history();
    // $('.table tbody').on('click', '.btn', function(){
    //     var currow = $(this).closest('tr');
    //     var col1 = currow.find('td:eq(0)').text();
    //     alert(col1);
    //     console.log(col1);
    // })  
    $(document).ready(function () {
        var table = '#listSchoolManager';
        setTimeout(pag,2000);
        
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

function abc() {
    
    var lis = document.querySelectorAll("span strong");  //select the elements
        for (var i = 0; i < lis.length; i++) {  //loop over the HTML collection
        var li = lis[i],  //reference the current element of the collection
        text = li.innerHTML,  //read the text (could use textContent)
        result = humanized_time_span(text);  //run the function
        li.innerHTML = result;  //replace the text with the result returned from calling the function
    }
}

function history() { 
var timeLine = "";
// var timeago = timeAgo.format(Date.now() - 60 * 1000, 'time')
SchoolManagementSessionInstance.methods.getSchoolCount().call().then(function (count) {
    for (let row = count-1; row >=0; row--) {
        SchoolManagementSessionInstance.methods.getSchoolAtIndex(row).call().then(function (addr) {
            SchoolManagementSessionInstance.methods.getSchool(addr).call().then(function (result) {
                SchoolManagementSessionInstance.methods.getSchoolAddition(addr).call().then(function (result1) {
                        timeLine +=
                            `
                            <li class="time-label">
                                <span>` + result1[0] + `</span>
                            </li>
                            <li>
                                <i class="fa fa-user bg-aqua"></i>
                                <div class="timeline-item">
                                    <span class="time"> 
                                        <i class="fa fa-clock-o"></i> <strong id="sss">` + result1[0] + ` </strong>
                                        <button style="display: none !important" id="btnTimeAgo" class="btn btn-danger btn-xs" 
                                             
                                            onclick = "abc()"
                                             >
                                            <i class="far fa-eye"></i>
                                                Xem lúc truy cập
                                        </button>
                                    </span>
                                    <h3 class="timeline-header no-border">
                                        <a href="#"> `+ result[2] +` </a> `+result[0]+` 
                                            <br>
                                        <a href="#"> `+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+`</a>
                                            <br>
                                        `+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+` `+ result1[2] +`
                                            <br>
                                    </h3>
                                    
                                </div>
                            </li>`;
                        $("#history").find(".timeline").html(timeLine);
                        document.getElementById("btnTimeAgo").click();
                })
            })
        });
    }
})

}

function listSchoolManagement() {
    var table = "";
    SchoolManagementSessionInstance.methods.getSchoolCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            SchoolManagementSessionInstance.methods.getSchoolAtIndex(row).call().then(function (addr) {
                SchoolManagementSessionInstance.methods.getSchool(addr).call().then(function (result) {
                    SchoolManagementSessionInstance.methods.getSchoolAddition(addr).call().then(function (result1) {
                            // console.log(result);
                            // console.log(result1);
                            // console.log(result2);
                            table += `<tr>
                                                <td>` + (parseInt(row)+1) + `</td>
                                                <td>` + result[1] + `</td>
                                                <td>` + result[3] + `</td>
                                                <td>` + result[2] + `</td>
                                                <td>` + result[4] + `</td>
                                                <td>` + result[5] + `</td>
                                                <td>` + result1[0] + `</td>
                                                <td>` + result1[1] + `</td>
                                                <td>
                                                <button class="btn btn-danger btn-xs" 
                                                data-toggle="modal" data-target="#deleteModal" 
                                                onclick="createDeleteView(\`` + result[0] + `\`)" >
                                                <i class="far fa-trash-alt"></i>
                                                    Xóa
                                                </button>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#updateModal"
                                                onclick="frontUpdateSchoolManagement(
                                                    
                                                    \`` + result[0] + `\`,
                                                    \`` + result[1] + `\`,
                                                    \`` + result[2] + `\`,
                                                    \`` + result[4] + `\`,
                                                    \`` + result[3] + `\`,
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

//delete quan ly truong
function deleteSchoolManagement() {
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
    SchoolManagementSessionInstance.methods.deleteSchool(address)
        .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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
    $("#insertValueUpdateFullNameModal").find(".modal-body2").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}

function createUpdateEmailView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdateEmailModal").find(".modal-body2").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}
function createUpdateAddrView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdateAddrModal").find(".modal-body2").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}
function createUpdateFaxView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdateFaxModal").find(".modal-body2").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}
function createUpdatePhoneView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdatePhoneModal").find(".modal-body2").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}
function createUpdateisLockView(address) {
    var parag = `<p>` + address + `</p>`;
    // var parag1 = `<input type="text">`;
    $("#insertValueUpdateisLockModal").find(".modal-body2").html(parag);
    // $("#insertValueUpdateModal").find(".modal-body").html(parag1);
}


function frontUpdateSchoolManagement(address, id, fullName, userAddr, email, fax, phoneNumber, createdTime, modifiedTime, isLocked) {
    var table = "";
    
                            table +=    `<tr>
                                            <th>Address</th>
                                            <td id="tdAddress">`+ address +`</td>
                                            <td></td>
                                        <tr>
                                            <th>ID</th>
                                            <td id="tdId">`+ id + `</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Tên Trường</th>
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
                                            <th>Địa chỉ</th>
                                            <td id="tdUserAddr">`+ userAddr + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateAddrModal"
                                                onclick="createUpdateAddrView(\`` + address + `\`)" >
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
                                            <th>Fax</th>
                                            <td id="tdFax">`+ fax + `</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs"
                                                data-toggle="modal" data-target="#insertValueUpdateFaxModal"
                                                onclick="createUpdateFaxView(\`` + address + `\`)" >
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
                                                data-toggle="modal" data-target="#insertValueUpdatePhoneModal"
                                                onclick="createUpdatePhoneView(\`` + address + `\`)" >
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
                                                data-toggle="modal" data-target="#insertValueUpdateisLockModal"
                                                onclick="createUpdateisLockView(\`` + address + `\`)" >
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
    var address = $('#insertValueUpdateFullNameModal .modal-body p').text();
    var fullName = $('#valueUpdateName').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateFullName(address, fullName, modifiedTime)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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

function updateEmailSchoolManagement() {
    var address = $('#insertValueUpdateEmailModal .modal-body p').text();
    var email = $('#valueUpdateEmail').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateEmail(address, email, modifiedTime)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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
    var address = $('#insertValueUpdateAddrModal .modal-body p').text();
    var addr = $('#valueUpdateAddr').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateAddr(address, addr, modifiedTime)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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
                $("#insertValueUpdateAddrModal").hide();
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
    var address = $('#insertValueUpdateFaxModal .modal-body p').text();
    var fax = $('#valueUpdateFax').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateFax(address, fax, modifiedTime)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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
                $("#insertValueUpdateFaxModal").hide();
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
    var address = $('#insertValueUpdatePhoneModal .modal-body p').text();
    var phone = $('#valueUpdatePhone').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updatePhone(address, phone, modifiedTime)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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
                $("#insertValueUpdatePhoneModal").hide();
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
    var address = $('#insertValueUpdateisLockModal .modal-body p').text();
    var isLocked = $('#valueUpdateisLock').val();
    var modifiedTime = new Date(Date.now()).toString();
    var batch = new web3.BatchRequest();
    batch.add(SchoolManagementSessionInstance.methods.updateIslocked(address, isLocked, modifiedTime)
            .send({ from: "0x4446B5dF39FAB2F3FAD857b13910C323786a0632" },
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
                $("#insertValueUpdateisLockModal").hide();
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