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
function pag(){
    $('.pagination').html('')
        var table = '#listCertificationTable';
        var trnum = 0;
        var maxRows = 20;
        var totalRows = $('#listCertificationTable tbody tr').length;
        console.log(totalRows);
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
    listCertification();
    $(document).ready(function () {
        var table = '#listCertificationTable';
        setTimeout(pag,2000);

        

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
        case "DONE":
            return "Đã duyệt";
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



function exportExcel(){
    $("#listCertificationTable").table2excel({
      exclude: ".noExl",
      name: "Report",
      filename: "danhSachVanBang", //do not include extension
      fileext: ".xls",
      preserveColors: true // file extension
    }); 
}
