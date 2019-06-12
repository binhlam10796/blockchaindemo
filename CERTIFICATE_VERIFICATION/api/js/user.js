if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var certificateSessionIntance = new web3.eth.Contract(CertificateStorageABI, "0xf5E9feb556d41Ac061654A5dCfbB592FCa24A306");

function addCertificate() {
    if ($('#addCertificateForm').parsley().validate()) {
        var id = $("#id").val();
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
        certificateSessionIntance.methods.getCertificate(id).call()
            .then((result) => {
                if (result[0] == "" && result[1] == "" && result[2] == "" && result[3] == "" && result[4] == ""
                    && result[5] == 0 && result[6] == "") {
                    certificateSessionIntance.methods.setCertificate(id, universityName, typeOfDegree,
                        major, name, dateOfBirth, status, yearOfGraduation, degreeClassification, modeOfStudy,
                        certificateDeliveryDate, number, regNo)
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
                                    console.log("Xảy ra lỗi Error: MetaMask Tx Signature: User denied transaction signature.");
                                }
                            })
                        .on('transactionHash', (hash) => {
                            $("#addDegree").hide();
                        })
                        .on('confirmation', (confirmationNumber, receipt) => {

                        })
                        .on('receipt', (receipt) => {
                            location.reload();
                            alert('Thành công.');
                            console.log(receipt);
                        })
                        .on('error', console.log("có lỗi MetaMask"));

                } else {
                    alert("ID đã tồn tại!");
                }
            });
    }
}


$(window).on('load', function () {
    listCertification();
    $(document).ready(function () {
        var table = '#listCertificationTable';


        $('.pagination').html('')
        var trnum = 0;
        var maxRows = 20;

        //var totalRows = $(table+' tbody tr').length;
        var totalRows = 41;
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
    $(document).ready(function () {
        var table = '#listCertificationApprove'
        $('#maxRowsListApprove').on('change', function () {
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

function statusCodeByName(status) {
    switch (status) {
        case "WAITTING":
            return "Đợi duyệt";
            break;
        case "DONE":
            return "Đã duyệt";
            break;
        default:
            break;
    }
}

function listCertification() {
    var table = "";
    certificateSessionIntance.getPastEvents('setCertificateEvent',
        { fromBlock: 0 }).then(function (eventCer) {
            certificateSessionIntance.getPastEvents('setCertificateAdditionEvent',
                { fromBlock: 0 }).then(function (eventAdd) {
                    for (var i = 0; i < eventCer.length; i++) {
                        for (var i = 0; i < eventAdd.length; i++) {
                            var res = eventCer[i];
                            var id = res.returnValues._id;
                            var universityName = res.returnValues._universityName;
                            var typeOfDegree = res.returnValues._typeOfDegree;
                            var major = res.returnValues._major;
                            var name = res.returnValues._name;
                            var dateOfBirth = res.returnValues._dateOfBirth;
                            var status = res.returnValues._status;

                            var res = eventAdd[i];
                            var yearOfGraduation = res.returnValues._yearOfGraduation;
                            var degreeClassification = res.returnValues._degreeClassification;
                            var modeOfStudy = res.returnValues._modeOfStudy;
                            var certificateDeliveryDate = res.returnValues._certificateDeliveryDate;
                            var number = res.returnValues._number;
                            var regNo = res.returnValues._regNo;

                            table += `<tr>
                                        <td>` + (parseInt(i) + 1) + `</td>
                                        <td>` + id + `</td>
                                        <td>` + universityName + `</td>
                                        <td>` + typeOfDegree + `</td>
                                        <td>` + major + `</td>
                                        <td>` + name + `</td>
                                        <td>` + dateOfBirth + `</td>
                                        <td>` + statusCodeByName(status) + `</td>
                                        <td>` + yearOfGraduation + `</td>
                                        <td>` + degreeClassification + `</td>
                                        <td>` + modeOfStudy + `</td>
                                        <td>` + certificateDeliveryDate + `</td>
                                        <td>` + number + `</td>
                                        <td>` + regNo + `</td>
                                    </tr>`;
                        }
                        $("#listCertificationTable").find("tbody").html(table);
                    }
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });
}

function listCertificationApprove() {
    var table = "";
    certificateSessionIntance.getPastEvents('setCertificateEvent',
        { fromBlock: 0 }).then(function (eventCer) {
            certificateSessionIntance.getPastEvents('setCertificateAdditionEvent',
                { fromBlock: 0 }).then(function (eventAdd) {
                    for (var i = 0; i < eventCer.length; i++) {
                        for (var i = 0; i < eventAdd.length; i++) {
                            var res = eventCer[i];
                            var id = res.returnValues._id;
                            var universityName = res.returnValues._universityName;
                            var typeOfDegree = res.returnValues._typeOfDegree;
                            var major = res.returnValues._major;
                            var name = res.returnValues._name;
                            var dateOfBirth = res.returnValues._dateOfBirth;
                            var status = res.returnValues._status;

                            var res = eventAdd[i];
                            var yearOfGraduation = res.returnValues._yearOfGraduation;
                            var degreeClassification = res.returnValues._degreeClassification;
                            var modeOfStudy = res.returnValues._modeOfStudy;
                            var certificateDeliveryDate = res.returnValues._certificateDeliveryDate;
                            var number = res.returnValues._number;
                            var regNo = res.returnValues._regNo;

                            table += `<tr>
                                        <td>` + "" + `</td>
                                        <td>` + (parseInt(i) + 1) + `</td>
                                        <td> <a href="#" data-toggle="modal" data-target="#approveDegree" 
                                            onclick="createApproveView(\`` + id + `\`,\`` + universityName + `\`,\`` + typeOfDegree + `\`,\`` + major + `\`,\`` + name +
                                `\`,\`` + dateOfBirth + `\`,\`` + degreeClassification + `\`,\`` + modeOfStudy + `\`,\`` + yearOfGraduation +
                                `\`,\`` + certificateDeliveryDate + `\`,\`` + number + `\`,\`` + regNo + `\`)">` + name + `</a> 
                                        </td>
                                        <td>` + dateOfBirth + `</td>
                                        <td>` + major + `</td>
                                        <td>` + degreeClassification + `</td>
                                        <td>` + yearOfGraduation + `</td>
                                        <td>` + certificateDeliveryDate + `</td>
                                        <td>` + number + `</td>
                                        <td>` + regNo + `</td>
                                    </tr>`;
                        }
                        $("#listCertificationApprove").find("tbody").html(table);
                    }
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });
}

function createApproveView(id, universityName, typeOfDegree, major, name, dateOfBirth,
    degreeClassification, modeOfStudy, yearOfGraduation, certificateDeliveryDate, number, regNo) {

    var table = `<tr>
                    <th>Mã văn bằng</th>
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

    var id = document.getElementById("tdId").innerText;
    var universityName = document.getElementById("tdUniversityName").innerText;
    var typeOfDegree = document.getElementById("tdTypeOfDegree").innerText;
    var major = document.getElementById("tdMajor").innerText;
    var name = document.getElementById("tdName").innerText;
    var dateOfBirth = document.getElementById("tdDateOfBirth").innerText;
    var status = "DONE";

    var yearOfGraduation = document.getElementById("tdYearOfGraduation").innerText;
    var degreeClassification = document.getElementById("tdDegreeClassification").innerText;
    var modeOfStudy = document.getElementById("tdModeOfStudy").innerText;
    var certificateDeliveryDate = document.getElementById("tdCertificateDeliveryDate").innerText;
    var number = document.getElementById("tdNumber").innerText;
    var regNo = document.getElementById("tdRegNo").innerText;

    var batch = new web3.BatchRequest();
    certificateSessionIntance.methods.setCertificate(id, universityName, typeOfDegree,
        major, name, dateOfBirth, status, yearOfGraduation,
        degreeClassification, modeOfStudy, certificateDeliveryDate, number, regNo)
        .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" });
    batch.add(certificateSessionIntance.methods.setUserConfirmCertificate("B1401025", "Trần Công Án",
        Date.now(), "Văn bằng thỏa điều kiện - Duyệt")
        .send({ from: "0x67a9c71DF6FfEC79CbEc0C5eC57490F8862aba0b" }));
    batch.execute();
}

function createTableWorkbook() {
    var workbook = new $.ig.excel.Workbook($.ig.excel.WorkbookFormat.excel2007);
    var sheet = workbook.worksheets().add('Report');
    sheet.columns(0).setWidth(72, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(1).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(2).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(3).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(4).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(5).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(6).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(7).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(8).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(9).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(10).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(11).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(12).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(13).setWidth(200, $.ig.excel.WorksheetColumnWidthUnit.pixel);

    // Create a to-do list table with columns for tasks and their priorities.
    sheet.getCell('A1').value('STT');
    sheet.getCell('B1').value('ID');
    sheet.getCell('C1').value('Trường đại học');
    sheet.getCell('D1').value('Loại bằng cấp');
    sheet.getCell('E1').value('Chuyên ngành');
    sheet.getCell('F1').value('Họ tên');
    sheet.getCell('G1').value('Ngày sinh');
    sheet.getCell('H1').value('Trạng thái');
    sheet.getCell('I1').value('Năm tốt nghiệp');
    sheet.getCell('J1').value('Xếp loại');
    sheet.getCell('K1').value('Hình thức đào tạo');
    sheet.getCell('L1').value('Ngày ký');
    sheet.getCell('M1').value('Số hiệu');
    sheet.getCell('N1').value('Số vào sổ');
    var table = sheet.tables().add('A1:N100', true);

    // Specify the style to use in the table (this can also be specified as an optional 3rd argument to the 'add' call above).
    table.style(workbook.standardTableStyles('TableStyleMedium2'))

    // Populate the table with data
    var table = '#listCertificationTable';
    var indexRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
    var totalRows = $(table + ' tbody tr').length;
    //console.log(totalRows);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    //console.log(rRow);
    //var texto = $('#listCertificationTable tr:nth-child(10) td:nth-child(2)').text();
    //console.log(texto);
    //var result = addQuotes(texto);
    for (var currentRow = 0; currentRow < totalRows+1; currentRow++) {
        for (var i = 0; i < indexRow.length+1; i++) {
                //console.log(indexRow[i] + currentRow);
                //var textto = $('#listCertificationTable tr:nth-child(' + currentRow + ') td:nth-child(' + i + ')').text();
                //var result = addQuotes(textto);
                var cell = indexRow[i] + currentRow;
                var reCell = addQuotes(cell);
                console.log(reCell);
                //sheet.getCell(reCell).value(result);
        }
    }



    // Sort the table by the Applicant column
    //table.columns('Applicant').sortCondition(new $.ig.excel.OrderedSortCondition());

    // Filter out the Approved applicants
    //table.columns('Status').applyCustomFilter(new $.ig.excel.CustomFilterCondition($.ig.excel.ExcelComparisonOperator.notEqual, 'Approved'));

    // Save the workbook
    //saveWorkbook(workbook, "DanhSachVanBang.xlsx");
}

function saveWorkbook(workbook, name) {
    workbook.save({ type: 'blob' }, function (data) {
        saveAs(data, name);
    }, function (error) {
        alert('Error exporting: : ' + error);
    });
}

//Them value vao dau nhay don
function addQuotes(value){
    if(value=="")return;
    var quotedVar = "\'" + value + "\'";
    return quotedVar;
}
// function test() {
//     var table = '#listCertificationTable';
//     var indexRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
//     var totalRows = $(table + ' tbody tr').length;
//     //console.log(totalRows);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
//     //console.log(rRow);
//     //var texto = $('#listCertificationTable tr:nth-child(10) td:nth-child(2)').text();
//     for (var currentRow = 1; currentRow <= totalRows; currentRow++) {
//         for (var i = 0; i <= indexRow.length; i++) {
//                 //console.log(indexRow[i] + currentRow);
//                 //console.log($('#listCertificationTable tr:nth-child(' + currentRow + ') td:nth-child(' + i + ')').text());
//                 sheet.getCell(indexRow[i] + currentRow).value($('#listCertificationTable tr:nth-child(' + currentRow + ') td:nth-child(' + i + ')').text());
            
//         }
//     }
// }