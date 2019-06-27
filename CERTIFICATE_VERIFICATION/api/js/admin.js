if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var degreeKindSessionInstance = new web3.eth.Contract(KindStorageABI, "0x6B692Af16dAd98c492c73Ce6a0e2661B29aCFf1f");
//var degreeNameSessionInstance = new web3.eth.Contract(NameStorageABI, "0xd1A7b0EeEf0aB77802F6EA760df33C82aA37E610");
var certificateSessionIntance = new web3.eth.Contract(CertificateStorageABI, "0x75b53FBA087E622b47E85a07a916560a2BaCe1Cf");

var temp = web3.eth.accounts.create();
var randomAddress = temp.address;

function sortTable(table, order) {
    var asc = order === 'asc', tbody = table.find('tbody');
    tbody.find('tr').sort(function (a, b) {
        if (asc) {
            return $('td:first', a).text().localeCompare($('td:first', b).text(), false, { numeric: true });
        } else {
            return $('td:first', b).text().localeCompare($('td:first', a).text(), false, { numeric: true });
        }
    }).appendTo(tbody);
}

function sortTable1() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("degreeNameTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
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

// Logic add degree kind
function addDegreeKind() {
    if ($('#idDegreeKindForm').parsley().validate()) {
        var randomAddress = web3.eth.accounts.create();
        var degreeKindId = randomAddress.address;
        var degreeKindName = $("#nameKindDegree").val();

        degreeKindSessionInstance.methods.setDegreeKind(degreeKindId, degreeKindName)
            .send({
                from: "0x508008bBF185f1FcE084aDEfF273728d5D7624d6"
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
            .on('error', console.err);
        try {
            batch.execute();
            if (error.message.includes("JSONRPC method should be specified for params:")) {
                console.log("This is more features!");
            }
        }
        catch (err) {
            console.log("This is feature");
        }
    }
}

function paginationDegreeKind() {
    $('#paginationKind').html('')
    var table = '#degreeKindTable';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#degreeKindTable tbody tr').length;
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
            $('#paginationKind').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationKind li:first-child').addClass('active')
    $('#paginationKind li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationKind li').removeClass('active')
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

function degreeKindButton() {
    sortTable($('#degreeKindTable'), 'asc');
    getListDegreeKind();
    //panigationDegreeKind
    $(document).ready(function () {
        var table = '#degreeKindTable';
        setTimeout(paginationDegreeKind, 2000);
        $('#maxRowsDegreeKind').on('change', function () {
            $('#paginationKind').html('')
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
                    $('#paginationKind').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('#paginationKind li:first-child').addClass('active')
            $('#paginationKind li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.paginationKind li').removeClass('active')
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
}
function getListDegreeKind() {
    var table = "";
    degreeKindSessionInstance.methods.getDegreeKindCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            degreeKindSessionInstance.methods.getDegreeKindIndex(row).call().then(function (addr) {
                degreeKindSessionInstance.methods.getDegreeKind(addr).call().then(function (result) {
                    //console.log(result[0]); console.log(result[1]);
                    table += `<tr>
                                <td>` + result[0] + `</td>
                                <td>` + result[1] + `</td>
                                <td>
                                    <button class="btn btn-danger btn-xs" 
                                        data-toggle="modal" data-target="#deleteModal" 
                                        onclick="createDeleteView(\`` + result[0] + `\`)" >
                                        <i class="far fa-trash-alt"></i>
                                        Xóa
                                    </button>
                                    <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#updateFrontDegreeKindManagement"
                                        onclick="frontUpdateDegreeKindManagement(  
                                            \`` + result[0] + `\`,
                                            \`` + result[1] + `\`)" >
                                        <i class="far fa-edit"></i>
                                        Sửa
                                    </button>
                                </td>
                        </tr>`;
                    $("#degreeKindTable").find("tbody").html(table);
                })
            })
        }
    });
}

function createDeleteView(degreeKindId) {
    var parag = `<p>` + degreeKindId + `</p>`;
    $("#deleteModal").find(".modal-body2").html(parag);
}

//delete quan ly nguoi dung
function deleteDegreeKindManagement() {
    var degreeKindId = $('#deleteModal .modal-body p').text();
    degreeKindSessionInstance.methods.deleteDegreeKind(degreeKindId)
        .send({ from: "0x3779b844Eb35D6589132D6Bf83CA2B1E1515b183" },
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
}

function createUpdateView(degreeKindId) {
    var parag = `<p>` + degreeKindId + `</p>`;
    $("#insertValueUpdateDegreeKindNameModal").find(".modal-body2").html(parag);
}

function frontUpdateDegreeKindManagement(degreeKindId, degreeKindName) {
    var table = "";
    table += `<tr>
                    <th>degreeKindId</th>
                    <td id="tdDegreeKindId">`+ degreeKindId + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>degreeKindName</th>
                    <td id="tdDegreeKindName">`+ degreeKindName + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateDegreeKindNameModal"
                        onclick="createUpdateView(\`` + degreeKindId + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>`;
    $("#tableUpdateDegreeKind").find("tbody").html(table);
}

function updateDegreeKindManagement() {
    var degreeKindId = $('#insertValueUpdateDegreeKindNameModal .modal-body p').text();
    var degreeKindName = $('#valueUpdate').val();
    var batch = new web3.BatchRequest();
    batch.add(degreeKindSessionInstance.methods.updateDegreeKindName(degreeKindId, degreeKindName)
        .send({ from: "0x3779b844Eb35D6589132D6Bf83CA2B1E1515b183" },
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
            $("#insertValueUpdateDegreeKindNameModal").hide();
            $("#updateFrontDegreeKindManagement").hide();
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


function addDegreeName() {

    if ($('#idDegreeNameForm').parsley().validate()) {
        var temp = web3.eth.accounts.create();
        var degreeNameId = temp.address; console.log(degreeNameId);

        this.console.log(temp);
        // var degreeNameId = randomAddress;
        var degreeKindId = $("#idKindDegreeSelect").val();
        var degreeName = $("#nameDegree").val();

        degreeNameSessionInstance.methods.InsertDegreeName(degreeNameId, degreeKindId, degreeName)
            .send({ from: "0x3779b844Eb35D6589132D6Bf83CA2B1E1515b183" },
                function (error, result) {
                    try {
                        if (error.message.includes("User denied transaction signature")) {
                            // handle the "error" as a rejection
                            alert('Đã từ chối dịch vụ.');
                            location.reload();
                        }
                    }
                    catch (err) {
                        console.log("OK");
                    }
                }
            )
            .on('transactionHash', (hash) => {
                $("#degreeNameModal").hide();
                $("#addNameModal").hide();
                $("#degreeNameTable").hide();
                alert("Vui lòng chờ xử lý giao dịch!");
            })
            .on('receipt', (receipt) => {
                alert("Success!");
                location.reload();
            })
            .on('confirmation', (confirmationNumber, receipt) => {

            })
            .on('error', console.err);
    }
}

function paginationLog() {
    $('#paginationLog').html('')
    var table = '#myTable';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#myTable tbody tr').length;
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
            $('#paginationLog').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationLog li:first-child').addClass('active')
    $('#paginationLog li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationLog li').removeClass('active')
        $(this).addClass('active')
        $(table + ' tr:gt(0)').each(function () {
            trIndex++
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide()
            } else {
                $(this).show()
            }
        })
    }
    )
}


$(window).on('load', function () {
    listApproveDiary();
    //panigationLog
    $(document).ready(function () {
        var table = '#myTable';
        setTimeout(paginationLog, 2000);
        $('#maxRowsLog').on('change', function () {
            $('#paginationLog').html('')
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
                    $('#paginationLog').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('#paginationLog li:first-child').addClass('active')
            $('#paginationLog li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.paginationLog li').removeClass('active')
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

function paginationDegreeName() {
    $('#paginationName').html('')
    var table = '#degreeNameTable';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#degreeNameTable tbody tr').length;
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
            $('#paginationName').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationName li:first-child').addClass('active')
    $('#paginationName li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationName li').removeClass('active')
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

function degreeNameButton() {
    getListDegreeName();
    // paginationDegreeName
    $(document).ready(function () {
        var table = '#degreeNameTable';
        setTimeout(paginationDegreeName, 2000);
        $('#maxRowsDegreeName').on('change', function () {
            $('#paginationName').html('')
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
                    $('#paginationName').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('#paginationName li:first-child').addClass('active')
            $('#paginationName li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.paginationName li').removeClass('active')
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
    getItemsSelectOption();
}

function getItemsSelectOption() {
    var select = `<option value="" selected disabled>Chọn loại văn bằng</option>`;
    degreeKindSessionInstance.methods.getDegreeKindCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            degreeKindSessionInstance.methods.getDegreeKindAtIndex(row).call().then(function (addr) {
                degreeKindSessionInstance.methods.getDegreeKind(addr).call().then(function (result) {

                    select += `<option value="` + result[0] + `">` + result[0] + `</option>`;
                    $("#idKindDegreeSelect").html(select);
                })
            })
        }
    });
}

function showNameById(address) {
    degreeKindSessionInstance.methods.getDegreeKind(`` + address + ``).call().then(function (result) {
        return result[1];
    })
}

function getListDegreeName() {
    var table = "";
    degreeKindSessionInstance.methods.getDegreeNameCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            degreeNameSessionInstance.methods.getDegreeNameAtIndex(row).call().then(function (addr) {
                degreeNameSessionInstance.methods.getDegreeName(addr).call().then(function (result) {
                    degreeKindSessionInstance.methods.getDegreeKind(result[1]).call().then(function (result1) {
                        table += `<tr>
                                        <td>` + result[0] + `</td>
                                        <td>` + result1[1] + `</td>
                                        <td>` + result[2] + `</td>
                                        <td>
                                        <button class="btn btn-danger btn-xs" 
                                        data-toggle="modal" data-target="#deleteDegreeNameModal" 
                                        onclick="createDeleteNameView(\`` + result[0] + `\`)" >
                                            <i class="far fa-trash-alt"></i>
                                            Xóa
                                        </button>
                                        <button class="btn btn-primary btn-xs"
                                        data-toggle="modal" data-target="#updateFrontDegreeNameManagement"
                                        onclick="frontUpdateDegreeNameManagement(  
                                            \`` + result[0] + `\`,
                                            \`` + result[1] + `\`)" >
                                            <i class="far fa-edit"></i>
                                            Sửa
                                        </button>
                                        </td>
                                    </tr>`;
                        $("#degreeNameTable").find("tbody").html(table);
                    })
                })
            })
        }
    });
}

function createDeleteNameView(degreeNameId) {
    var parag = `<p>` + degreeNameId + `</p>`;
    $("#deleteDegreeNameModal").find(".modal-body1").html(parag);
}

//delete quan ly nguoi dung
function deleteDegreeNameManagement() {
    var degreeNameId = $('#deleteDegreeNameModal .modal-body p').text();
    degreeNameSessionInstance.methods.deleteDegreeName(degreeNameId)
        .send({ from: "0x3779b844Eb35D6589132D6Bf83CA2B1E1515b183" },
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
            $("#deleteDegreeNameModal").hide();
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

function createUpdateViewdegreeName(degreeNameId) {
    var parag = `<p>` + degreeNameId + `</p>`;
    $("#insertValueUpdateDegreeNameModal").find(".modal-body2").html(parag);
}

function frontUpdateDegreeNameManagement(degreeNameId, degreeName) {
    var table = "";
    table += `<tr>
                    <th>degreeKindId</th>
                    <td id="tdDegreeKindId">`+ degreeNameId + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>degreeKindName</th>
                    <td id="tdDegreeKindName">`+ degreeName + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateDegreeNameModal"
                        onclick="createUpdateViewdegreeName(\`` + degreeNameId + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>`;
    $("#tableUpdateDegreeName").find("tbody").html(table);
}

function updateDegreeNameManagement() {
    var degreeNameId = $('#insertValueUpdateDegreeNameModal .modal-body p').text();
    var degreeName = $('#valueUpdatedegreeName').val();
    var batch = new web3.BatchRequest();
    batch.add(degreeNameSessionInstance.methods.updateDegreeName(degreeNameId, degreeName)
        .send({ from: "0x3779b844Eb35D6589132D6Bf83CA2B1E1515b183" },
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
            $("#insertValueUpdateDegreeNameModal").hide();
            $("#updateFrontDegreeNameManagement").hide();
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

$(window).on('load', function () {
    listApproveDiary();
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

function listApproveDiary() {
    var table = "";
    // certificateSessionIntance.getPastEvents('setUserConfirmCertificateEvent',
    //     { fromBlock: 0, 
    //         filter: { _status: "DONE" } 
    //     }).then(function (eventUser) {
    //         certificateSessionIntance.getPastEvents('setCertificateEvent',
    //             { fromBlock: 0 }
    //             ).then(function (eventCer) {
    //                 for (var i = 0; i < eventUser.length; i++) {
    //                     for (var i = 0; i < eventCer.length; i++) {
    //                         var res = eventCer[i];
    //                         var id = res.returnValues._id;
    //                         var status = res.returnValues._status;
    //                         var resUser = eventUser[i];
    //                         var userId = resUser.returnValues._userId;
    //                         //var userId = "B1401025";
    //                         var userName = resUser.returnValues._userName;
    //                         //var userName = "Trần Công Án";
    //                         var dateTime = resUser.returnValues._dateTime;
    //                         var date = Date(dateTime);
    //                         var comment = resUser.returnValues._comment;
    //                         //var comment = "Văn bằng thỏa điều kiện - Duyệt";

    //                         table += `<tr>
    //                                     <td>` + userId + `</td>
    //                                     <td>` + userName + `</td>
    //                                     <td>` + id + `</td>
    //                                     <td>` + statusCodeByName(status) + `</td>
    //                                     <td>` + date.toString() + `</td>
    //                                     <td>` + comment + `</td>
    //                                 </tr>`;
    //                         $("#myTable").find("tbody").html(table);
    //                     }
    //                     //$("#myTable").find("tbody").html(table);
    //                 }
    //             }).catch(err => {
    //                 console.log(err);
    //             });
    //     }).catch(err => {
    //         console.log(err);
    //     });
}

// Logic filter
function filterByName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("nameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterByType() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("typeInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// degreeManagementModal
function degreeManagementButton() {
    listDegreeManagement();
}

function listDegreeManagement() {
    var table = getListDegreeManagement();
    $("#degreeManagementModal").find("tbody").html(table);
}

function getListDegreeManagement() {
    var table = "";
    for (var i = 0; i < 3; i++) {
        table += `<tr id="` + i + `">
        <td onclick="edit(` + i + `, 'Tiger Nixon','System Architect','2019/04/25')">Tiger Nixon</td>
        <td onclick="edit(` + i + `, 'Tiger Nixon','System Architect','2019/04/25')">System Architect</td>
        <td onclick="edit(` + i + `, 'Tiger Nixon','System Architect','2019/04/25')">2019/04/25</td>
        <td class="center"><button type="button" class="close" onclick="deleteAuth(` + i + `)"><i class="fa fa-fw fa-close btn-remove"></i></button></i></td>
        </tr>`;
    }
    return table;
}

function edit(id, name, org, date) {
    document.getElementById(id).innerHTML = `<tr id="` + id + `">
    <td class="edit"><input type="text" value="` + name + `"/></td>
    <td class="edit"><input type="text" value="` + org + `"/></td>
    <td class="edit"><input type="date" value="` + date + `"/></td>
    <td class="edit"><button type="button" class="close" onclick="cancelEdit(` + id + `, '` + name + `', '` + org + `', '` + date + `')"><i class="fa fa-fw fa-close btn-remove"></i></button></td>
    </tr>`;
}

function cancelEdit(id, name, org, date) {
    document.getElementById(id).innerHTML = `<tr id="` + id + `">
    <td onclick="edit(` + id + `, '` + name + `','` + org + `','` + date + `')">` + name + `</td>
    <td onclick="edit(` + id + `, '` + name + `','` + org + `','` + date + `')">` + org + `</td>
    <td onclick="edit(` + id + `, '` + name + `','` + org + `','` + date + `')">` + date + `</td>
    <td class="center"><button type="button" class="close" onclick="deleteAuth(` + id + `)"><i class="fa fa-fw fa-close btn-remove"></i></button></i></td>
    </tr>`;
}

function deleteAuth(id) {
    listDegreeManagement();
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
