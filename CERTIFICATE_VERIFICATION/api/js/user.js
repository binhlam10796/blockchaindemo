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
                        major, name, dateOfBirth, status,yearOfGraduation, degreeClassification, modeOfStudy,
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
        var table = '#listCertificationTable'
        $('#maxRowsListDegree').on('change',function(){
            $('.pagination').html('')
            var trnum = 0;
            var maxRows = parseInt($(this).val())
            var totalRows = $(table+' tbody tr').length
            $(table+' tr:gt(0)').each(function(){
                trnum++
                if(trnum > maxRows){
                    $(this).hide()
                }
                if(trnum <= maxRows){
                    $(this).show()
                }
            })
            if(totalRows > maxRows){
                var pagenum = Math.ceil(totalRows/maxRows)
                for(var i=1; i<=pagenum;){
                    $('.pagination').append('<li data-page="'+i+'">\<span>'+ i++ +'<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('.pagination li:first-child').addClass('active')
            $('.pagination li').on('click', function(){
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.pagination li').removeClass('active')
                $(this).addClass('active')
                $(table+' tr:gt(0)').each(function(){
                    trIndex++
                    if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                        $(this).hide()
                    }else{
                        $(this).show()
                    }
                })
            })
        })
    });

    listCertificationApprove();
    $(document).ready(function () {
        var table = '#listCertificationApprove'
        $('#maxRowsListApprove').on('change',function(){
            $('.pagination').html('')
            var trnum = 0;
            var maxRows = parseInt($(this).val())
            var totalRows = $(table+' tbody tr').length
            $(table+' tr:gt(0)').each(function(){
                trnum++
                if(trnum > maxRows){
                    $(this).hide()
                }
                if(trnum <= maxRows){
                    $(this).show()
                }
            })
            if(totalRows > maxRows){
                var pagenum = Math.ceil(totalRows/maxRows)
                for(var i=1; i<=pagenum;){
                    $('.pagination').append('<li data-page="'+i+'">\<span>'+ i++ +'<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('.pagination li:first-child').addClass('active')
            $('.pagination li').on('click', function(){
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.pagination li').removeClass('active')
                $(this).addClass('active')
                $(table+' tr:gt(0)').each(function(){
                    trIndex++
                    if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                        $(this).hide()
                    }else{
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
    sheet.columns(1).setWidth(160, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(2).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(3).setWidth(275, $.ig.excel.WorksheetColumnWidthUnit.pixel);

    // Create a to-do list table with columns for tasks and their priorities.
    sheet.getCell('A1').value('ID');
    sheet.getCell('B1').value('Applicant');
    sheet.getCell('C1').value('Status');
    sheet.getCell('D1').value('Comment');
    var table = sheet.tables().add('A1:D8', true);

    // Specify the style to use in the table (this can also be specified as an optional 3rd argument to the 'add' call above).
    table.style(workbook.standardTableStyles('TableStyleMedium2'))

    // Populate the table with data
    sheet.getCell('A2').value(3223);
    sheet.getCell('B2').value('Jack Banner');
    sheet.getCell('C2').value('Approved');
    sheet.getCell('D2').value('');

    sheet.getCell('A3').value(3224);
    sheet.getCell('B3').value('Armin Barrywater');
    sheet.getCell('C3').value('In Review');
    sheet.getCell('D3').value('Underwriter is out until next week.');

    sheet.getCell('A4').value(3225);
    sheet.getCell('B4').value('Shiela Donahue');
    sheet.getCell('C4').value('In Review');
    sheet.getCell('D4').value('');

    sheet.getCell('A5').value(3226);
    sheet.getCell('B5').value('Perry Kane');
    sheet.getCell('C5').value('On Hold');
    sheet.getCell('D5').value('Waiting on paperwork from customer.');

    sheet.getCell('A6').value(3235);
    sheet.getCell('B6').value('Xavier Fannello');
    sheet.getCell('C6').value('New');
    sheet.getCell('D6').value('');

    sheet.getCell('A7').value(3244);
    sheet.getCell('B7').value('Georgi Angelchov');
    sheet.getCell('C7').value('New');
    sheet.getCell('D7').value('');

    sheet.getCell('A8').value(3257);
    sheet.getCell('B8').value('Imelda Sanchez');
    sheet.getCell('C8').value('New');
    sheet.getCell('D8').value('');

    // Sort the table by the Applicant column
    table.columns('Applicant').sortCondition(new $.ig.excel.OrderedSortCondition());

    // Filter out the Approved applicants
    table.columns('Status').applyCustomFilter(new $.ig.excel.CustomFilterCondition($.ig.excel.ExcelComparisonOperator.notEqual, 'Approved'));

    // Save the workbook
    saveWorkbook(workbook, "Table.xlsx");
}

function saveWorkbook(workbook, name) {
    workbook.save({ type: 'blob' }, function (data) {
        saveAs(data, name);
    }, function (error) {
        alert('Error exporting: : ' + error);
    });
}

// Import execl
$(function () {
    $("#file-upload").on("change", function () {
        var excelFile,
            fileReader = new FileReader();

        $("#result").hide();

        fileReader.onload = function (e) {
            var buffer = new Uint8Array(fileReader.result);

            $.ig.excel.Workbook.load(buffer, function (workbook) {
                var column, row, newRow, cellValue, columnIndex, i,
                    worksheet = workbook.worksheets(0),
                    columnsNumber = 0,
                    gridColumns = [],
                    data = [],
                    worksheetRowsCount;

                // Both the columns and rows in the worksheet are lazily created and because of this most of the time worksheet.columns().count() will return 0
                // So to get the number of columns we read the values in the first row and count. When value is null we stop counting columns:
                while (worksheet.rows(0).getCellValue(columnsNumber)) {
                    columnsNumber++;
                }

                // Iterating through cells in first row and use the cell text as key and header text for the grid columns
                for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                    column = worksheet.rows(0).getCellText(columnIndex);
                    gridColumns.push({ headerText: column, key: column });
                }

                // We start iterating from 1, because we already read the first row to build the gridColumns array above
                // We use each cell value and add it to json array, which will be used as dataSource for the grid
                for (i = 1, worksheetRowsCount = worksheet.rows().count(); i < worksheetRowsCount; i++) {
                    newRow = {};
                    row = worksheet.rows(i);

                    for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                        cellValue = row.getCellText(columnIndex);
                        newRow[gridColumns[columnIndex].key] = cellValue;
                    }

                    data.push(newRow);
                }

                // we can also skip passing the gridColumns use autoGenerateColumns = true, or modify the gridColumns array
                createGrid(data, gridColumns);
            }, function (error) {
                $("#result").text("The excel file is corrupted.");
                $("#result").show(1000);
            });
        }

        if (this.files.length > 0) {
            excelFile = this.files[0];
            if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
                fileReader.readAsArrayBuffer(excelFile);
            } else {
                $("#result").text("The format of the file you have selected is not supported. Please select a valid Excel file ('.xls, *.xlsx').");
                $("#result").show(1000);
            }
        }

    })
});

function createGrid(data, gridColumns) {
    if ($("#grid1").data("igGrid") !== undefined) {
        $("#grid1").igGrid("destroy");
    }

    $("#grid1").igGrid({
        columns: gridColumns,
        autoGenerateColumns: true,
        dataSource: data,
        width: "100%"
    });
}


