if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var certificateSessionIntance = new web3.eth.Contract(CertificateStorageABI, "0x1Cbaac790Fae48baC414cefF08246dA6bceB05fA");
var degreeKindSessionInstance = new web3.eth.Contract(KindStorageABI, "0xEDa26Ff4A9F9fD8ABa7DAC520A530ab9362e54Fe");
var SchoolManagementSessionInstance = new web3.eth.Contract(SchoolStorageABI, "0x99440E9b6Fc1ff3a7E0E16C90822A55038c62F60");
var userManagementSessionInstance = new web3.eth.Contract(UserManagementStorageABI, "0xE6A67C0e38A0a4609E4869088416801c6E12F742");


function addCertificate() {
    if ($('#addCertificateForm').parsley().validate()) {
        web3.eth.getAccounts(function (error, result) {

            var temp = web3.eth.accounts.create();
            var id = temp.address;
            var universityName = $("#universityName").val();
            var typeOfDegree = $("#typeOfDegree").val();
            var major = $("#major").val();
            var name = $("#name").val();
            var dateOfBirth = $("#dateOfBirth").val();
            var yearOfGraduation = $("#yearOfGraduation").val();
            var degreeClassification = $("#degreeClassification").val();
            var modeOfStudy = $("#modeOfStudy").val();
            var certificateDeliveryDate = $("#certificateDeliveryDate").val();
            var number = $("#number").val();
            var regNo = $("#regNo").val();
            var status = "WAITTING";
            var batch = new web3.BatchRequest();
            var ac = result[0];
            batch.add(certificateSessionIntance.methods.setCertificate(id, universityName, typeOfDegree, major, name)
                .send({
                    from: ac
                }, function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                        }
                    }
                    catch (err) {
                        //console.log("OK Loi~");
                    }
                }
                ));
            //console.log("b1");

            batch.add(certificateSessionIntance.methods.setCertificateAddition(id, dateOfBirth, status, yearOfGraduation, degreeClassification)
                .send({
                    from: ac
                }, function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                        }
                    }
                    catch (err) {
                        //console.log("OK Loi~");
                    }
                }));
            //console.log("b2");
            batch.add(certificateSessionIntance.methods.setCertificateAdditionDetail(id, modeOfStudy, certificateDeliveryDate, number, regNo)
                .send({
                    from: ac
                }, function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                        }
                    }
                    catch (err) {
                        console.log("This is feature!");
                    }
                }
                )
            );
            
            //console.log(ac);
            var thaotac = "thêm";
            var comment = "Day la comment!"
            var his = web3.eth.accounts.create();
            var idhis = his.address;
            var createTimeCertificate = new Date(Date.now()).toLocaleString();
            batch.add(certificateSessionIntance.methods.setHistoryCer(idhis, ac, id, thaotac, createTimeCertificate, comment)
                .send({
                    from: ac
                }, function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                        }
                    }
                    catch (err) {
                        console.log("This is feature!");
                    }
                }
                )
                .on('transactionHash', (hash) => {
                    // getConfirmations(hash);
                    // confirmEtherTransaction(hash, 3);
                    $("#addUser").hide();
                    alert("Processing...Please wait for the notification!");
                })
                .on('receipt', (receipt) => {
                    alert("Success!");
                    location.reload();
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    //console.log(confirmationNumber);
                })
                .on('error', console.err)
            );
            try {
                batch.execute();
                if (error.message.includes("JSONRPC method should be specified for params:")) {
                    console.log("This is more features!");
                }
            }
            catch (err) {
                console.log("This is feature");
            }
        });
    }
    //end parsley
}




function getSchoolOption() {
    var select = `<option value="" selected disabled>Chọn trường đại học</option>`;
    SchoolManagementSessionInstance.methods.getSchoolCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            SchoolManagementSessionInstance.methods.getSchoolAtIndex(row).call().then(function (addr) {
                SchoolManagementSessionInstance.methods.getSchool(addr).call().then(function (result) {

                    select += `<option value="` + result[1] + `">` + result[1] + `</option>`;
                    $("#universityName").html(select);
                })
            })
        }
    });
}

function getDegreeKindOption() {
    var select = `<option value="" selected disabled>Chọn loại văn bằng</option>`;
    degreeKindSessionInstance.methods.getDegreeKindCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            degreeKindSessionInstance.methods.getDegreeKindAtIndex(row).call().then(function (addr) {
                degreeKindSessionInstance.methods.getDegreeKind(addr).call().then(function (result) {

                    select += `<option value="` + result[1] + `">` + result[1] + `</option>`;
                    $("#typeOfDegree").html(select);
                })
            })
        }
    });
}

function getAccount() {
    var account = web3.eth.accounts[0];
    var accountInterval = setInterval(function () {
        if (web3.eth.accounts[0] !== account) {
            account = web3.eth.accounts[0];
            document.getElementById("address").innerHTML = account;
        }
    }, 100);
}
//Load list certificate and pagination
function pag() {
    $('.pagination').html('')
    var table = '#listCertificationTable';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#listCertificationTable tbody tr').length;
    //console.log(totalRows);
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


function pagApprove() {
    $('#approveNumber').html('')
    var table = '#listCertificationApprove';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#listCertificationApprove tbody tr').length;
    //console.log(totalRows);
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
            $('#approveNumber').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#approveNumber li:first-child').addClass('active')
    $('#approveNumber li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#approveNumber li').removeClass('active')
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


//Sort table by id
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("listCertificationTable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }


  //Sort table by id
function sortTableApprove() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("listCertificationApprove");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }


$(window).on('load', function () {
    listCertification();
    getSchoolOption();
    getDegreeKindOption();
    $(document).ready(function () {
        var table = '#listCertificationTable';
        setTimeout(pag, 5000);
        setTimeout(sortTable, 4000);


        $('#maxRowsListDegree').on('change', function () {
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

    listCertificationApprove();
    setTimeout(pagApprove, 5000);
    setTimeout(sortTableApprove, 4000);
    $(document).ready(function () {
        var table = '#listCertificationApprove'
        $('#maxRowsListApprove').on('change', function () {
            $('#approveNumber').html('')
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
                    $('#approveNumber').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('#approveNumber li:first-child').addClass('active')
            $('#approveNumber li').on('click', function () {
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
    getHistory();
});


//End Load list certificate and pagination
function statusCodeByName(status) {
    switch (status) {
        case "WAITTING":
            return "Đợi duyệt";
        case "DONE":
            return "Đã duyệt";
        default:
            break;
    }
}

function listCertification() {
    var table = "";
    certificateSessionIntance.methods.getUserCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            certificateSessionIntance.methods.getCertificateIndex(row).call().then(function (addr) {
                certificateSessionIntance.methods.getCertificate(addr).call().then(function (result) {
                    certificateSessionIntance.methods.getCertificateAddition(addr).call().then(function (result1) {
                        certificateSessionIntance.methods.getCertificateAdditionDetail(addr).call().then(function (result2) {
                            table += `<tr>  <td>` + (row + 1) + `</td>
                                                <td>` + result[0] + `</td>
                                                <td>` + result[1] + `</td>
                                                <td>` + result[2] + `</td>
                                                <td>` + result[3] + `</td>
                                                <td>` + result[4] + `</td>
                                                <td>` + result1[0] + `</td>
                                                <td>` + statusCodeByName(result1[1]) + `</td>
                                                <td>` + result1[2] + `</td>
                                                <td>` + result1[3] + `</td>
                                                <td>` + result2[0] + `</td>
                                                <td>` + result2[1] + `</td>
                                                <td>` + result2[2] + `</td>
                                                <td>` + result2[3] + `</td>
                                            </tr>`;
                            $("#listCertificationTable").find("tbody").html(table);
                        })
                    })
                })
            });
        }
    })
}

function listCertificationApprove() {
    var table = "";
    certificateSessionIntance.methods.getUserCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            certificateSessionIntance.methods.getCertificateIndex(row).call().then(function (addr) {
                certificateSessionIntance.methods.getCertificate(addr).call().then(function (result) {
                    certificateSessionIntance.methods.getCertificateAddition(addr).call().then(function (result1) {
                        certificateSessionIntance.methods.getCertificateAdditionDetail(addr).call().then(function (result2) {
                            if (result1[1] == 'WAITTING') {
                                table += `<tr>  <td>` + (row + 1) + `</td>
                                                <td> <a href="#" data-toggle="modal" data-target="#approveDegree" 
                                                onclick="createApproveView(\`` + result[0] + `\`,\`` + result[1] + `\`,\`` + result[2] + `\`,
                                                \``+ result[3] + `\`,\`` + result[4] + `\`,\`` + result1[0] + `\`,\`` + result1[3] + `\`,\`` + result2[0] + `\`,
                                                \``+ result1[2] + `\`,\`` + result2[1] + `\`,\`` + result2[2] + `\`,\`` + result2[3] + `\`,)">` + result[4] + `</td>
                                                <td>` + result1[0] + `</td>
                                                <td>` + result[3] + `</td>
                                                <td>` + result1[3] + `</td>
                                                <td>` + result1[2] + `</td>
                                                <td>` + result2[1] + `</td>
                                                <td>` + result2[2] + `</td>
                                                <td>` + result2[3] + `</td>
                                            </tr>`;
                                $("#listCertificationApprove").find("tbody").html(table);
                            }
                        })
                    })
                })
            });
        }
    })
}

function createApproveView(id, universityName, typeOfDegree, major, name, dateOfBirth,
    degreeClassification, modeOfStudy, yearOfGraduation, certificateDeliveryDate, number, regNo) {

    var table = `<tr>
                    <th>ID</th>
                    <td id="tdId">` + id + `</td>
                <tr>
                    <th>Trường đại học</th>
                    <td id="tdUniversityName">` + universityName + `</td>
                </tr>
                <tr>
                    <th>Loại bằng cấp</th>
                    <td id="tdTypeOfDegree">` + typeOfDegree + `</td>
                </tr>
                <tr>
                    <th>Chuyên ngành</th>
                    <td id="tdMajor">` + major + `</td>
                </tr>
                <tr>
                    <th>Họ tên</th>
                    <td id="tdName">` + name + `</td>
                </tr>
                <tr>
                    <th>Ngày sinh</th>
                    <td id="tdDateOfBirth">` + dateOfBirth + `</td>
                </tr>
                <tr>
                    <th>Xếp loại</th>
                    <td id="tdDegreeClassification">` + degreeClassification + `</td>
                </tr>
                <tr>
                    <th>Hình thức đào tạo</th>
                    <td id="tdModeOfStudy">` + modeOfStudy + `</td>
                </tr>
                <tr>
                    <th>Năm tốt nghiệp</th>
                    <td id="tdYearOfGraduation">` + yearOfGraduation + `</td>
                </tr>
                <tr>
                    <th>Ngày ký</th>
                    <td id="tdCertificateDeliveryDate">` + certificateDeliveryDate + `</td>
                </tr>
                <tr>
                    <th>Số hiệu</th>
                    <td id="tdNumber">` + number + `</td>
                </tr>
                <tr>
                    <th>Số vào sổ</th>
                    <td id="tdRegNo">` + regNo + `</td>
                </tr>`;

    $("#degreeApprove").find("tbody").html(table);
}

function doApproveCertificate() {
    web3.eth.getAccounts(function (error, result) {
            var id = document.getElementById("tdId").innerText;
            var status = "DONE";
            var batch = new web3.BatchRequest();
            var account = result[0];
            batch.add(certificateSessionIntance.methods.approveCertificate(id, status)
                .send({
                    from: account
                }, function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                        }
                    }
                    catch (err) {
                        console.log("This is feature!");
                    }
                })
            );
            var his = web3.eth.accounts.create();
            var idhis = his.address;
            
            var thaotac = "duyệt";
            var comment = "Da duyet van bang";
            var createTimeCertificate = new Date(Date.now()).toLocaleString();
            batch.add(certificateSessionIntance.methods.setHistoryCer(idhis, account, id , thaotac, createTimeCertificate, comment)
                .send({
                    from: account
                }, function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            alert("Denied transaction!");
                        }
                    }
                    catch (err) {
                        console.log("This is feature!");
                    }
                })
                .on('transactionHash', (hash) => {
                    // getConfirmations(hash);
                    // confirmEtherTransaction(hash, 3);
                    $("#addUser").hide();
                    alert("Processing...Please wait for the notification!");
                })
                .on('receipt', (receipt) => {
                    alert("Success!");
                    location.reload();
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    //console.log(confirmationNumber);
                })
                .on('error', console.err)
            );
            try {
                batch.execute();
                if (error.message.includes("JSONRPC method should be specified for params:")) {
                    console.log("This is more features!");
                }
            }
            catch (err) {
                console.log("This is feature");
            };
        });
}



function exportExcel() {
    $("#listCertificationTable").table2excel({
        exclude: ".noExl",
        name: "Report",
        filename: "danhSachVanBang", //do not include extension
        fileext: ".xls",
        preserveColors: true // file extension
    });
}





function getHistory() {
    certificateSessionIntance.methods.getHisCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            certificateSessionIntance.methods.getHisIndex(row).call().then(function (addr) {
                certificateSessionIntance.methods.getHistoryCertificate(addr).call().then(function (result) {
                    if ($(".time-label").length == 0) {
                        timeLine(result[1], result[3], result[4]);
                    }
                    else if ($(".time-label").length !== 0 && $(".time-label:contains('"+tg(result[4])+"')").text().trim() == tg(result[4])) {
                        $(".time-label:contains('"+tg(result[4])+"')").after(`<li>
                             <i class="fa fa-user bg-aqua"></i>
                             <div class="timeline-item">
                                    <span class="time">
                                     <i class="fa fa-clock-o"></i>`+ relativeTime(result[4]) + `</span>
                                     <h3 class="timeline-header no-border">
                                     <a href="#" data-toggle="modal" data-target="#viewUserModal" onclick="viewUser('`+result[1]+`')">`+ result[1] + `</a> đã ` + result[3] + `</h3>
                             </div>
                         </li>`);
                    }
                    else {
                        if(getT1me($('.time-label').first().text().trim()) < getT1me(tg(result[4])))
                        {
                        $('.time-label').first().before(`
                            <li class="time-label">
                                    <span class="bg-green">`+ tg(result[4]) + `</span>
                            </li>
                            <li>
                            <i class="fa fa-user bg-aqua"></i>
                            <div class="timeline-item">
                                    <span class="time">
                                    <i class="fa fa-clock-o"></i>`+ relativeTime(result[4]) + `</span>
                                    <h3 class="timeline-header no-border">
                                    <a href="#" data-toggle="modal" data-target="#viewUserModal" onclick="viewUser('`+result[1]+`')">`+ result[1] + `</a> đã ` + result[3] + `</h3>
                            </div>
                        </li>`);
                        }
                        else{
                            for(var i=0;i<($('.time-label').length);i++){
                                if(getT1me(tg(result[4]))<getT1me($('.time-label')[i].innerText)&&getT1me(tg(result[4]))>getT1me($('.time-label')[i+1].innerText)){
                                    $("#historyCertification").find(".time-label").eq(i+1).before(`
                                    <li class="time-label">
                                            <span class="bg-green">`+ tg(result[4]) + `</span>
                                    </li>
                                    <li>
                                    <i class="fa fa-user bg-aqua"></i>
                                    <div class="timeline-item">
                                            <span class="time">
                                            <i class="fa fa-clock-o"></i>`+ relativeTime(result[4]) + `</span>
                                            <h3 class="timeline-header no-border">
                                            <a href="#" data-toggle="modal" data-target="#viewUserModal" onclick="viewUser('`+result[1]+`')">`+ result[1] + `</a> đã ` + result[3] + `</h3>
                                    </div>
                                    </li>`);
                                }
                            }
                            //console.log("OK");
                        }
                        
                        
                        // $('.time-label').first().before(`
                        //     <li class="time-label">
                        //             <span class="bg-green">`+ tg(result[4]) + `</span>
                        //     </li>
                        //     <li>
                        //     <i class="fa fa-user bg-aqua"></i>
                        //     <div class="timeline-item">
                        //             <span class="time">
                        //             <i class="fa fa-clock-o"></i>`+ relativeTime(result[4]) + `</span>
                        //             <h3 class="timeline-header no-border">
                        //             <a href="#" data-toggle="modal" data-target="#viewUserModal" onclick="viewUser('`+result[1]+`')">`+ result[1] + `</a> đã ` + result[3] + `</h3>
                        //     </div>
                        // </li>`);
                    };
                })
            })
        }
    });
}
//get time to compare time
function getT1me(String){
    var n = new Date(String);
    var result = n.getTime();
    return result;
}

//format date
function tg(date) {
    var timeLabel = formatDate(new Date(cutStringDate(date)));
    return timeLabel;
}

//ham time line break
function timeLine(id, thaotac, thoigian) {
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
                            <a href="#" data-toggle="modal" data-target="#viewUserModal" onclick="viewUser('`+id+`')">`+ id + `</a> đã ` + thaotac + `</h3>
                </div>
                </li>`;
    $("#historyCertification").find(".timeline").html(history);
}
//Ham xu li thoi gian
function cutStringDate(str) {
    var n = str.search(",");
    var result = str.slice(0, n);
    return result;
}
//6 Jan 2019
function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
//a minute ago
function relativeTime(date) {
    var date1 = moment(date).fromNow();
    return date1;
}
//End ham xu li thoi gian

//Modal view user
function viewUser(id) {
    //console.log(id);
    userManagementSessionInstance.methods.getUser(id).call().then(function (result){
        userManagementSessionInstance.methods.getUserDetailMoreMore(id).call().then(function (result1){
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
                            <td>` + result1[0] + `</td>
                        </tr>`;
                $("#viewUser").find("tbody").html(table);
            })
        })
            
}
