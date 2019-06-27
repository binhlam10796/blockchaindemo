if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var degreeKindSessionInstance = new web3.eth.Contract(KindStorageABI, "0x99b476b93CAd851F7FeA03A621b2d8cD2db8C9A2");
var degreeNameSessionInstance = new web3.eth.Contract(NameStorageABI, "0x2c5190fbE008e6698Fc2CEaDFf9d45eF4bd2e857");
var historySessionInstance = new web3.eth.Contract(HistotyStorageABI, "0x37aBEdDf4A6f7dA8b51e250539e46606a595ED07");
var certificateSessionIntance = new web3.eth.Contract(CertificateStorageABI, "0x1Cbaac790Fae48baC414cefF08246dA6bceB05fA");
var userManagementSessionInstance = new web3.eth.Contract(UserManagementStorageABI, "0xE6A67C0e38A0a4609E4869088416801c6E12F742");

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
    web3.eth.getAccounts(function (error, result) {
        if ($('#idDegreeKindForm').parsley().validate()) {
            var temp = web3.eth.accounts.create();
            var randomAddress = temp.address;
            var degreeKindId = randomAddress;
            var degreeKindName = $("#nameKindDegree").val();

            var tempId = web3.eth.accounts.create();
            var randomId = tempId.address;
            var idHistory = randomId;
            var account = result[0];
            var thaoTac = "Thêm loại văn bằng " + degreeKindName;
            var date = new Date(Date.now()).toString();

            var batch = new web3.BatchRequest();

            batch.add(degreeKindSessionInstance.methods.InsertDegreeKind(degreeKindId, degreeKindName)
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
                    }
                ));
            batch.add(historySessionInstance.methods.InsertHistory(idHistory, account, thaoTac, date)
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
                    }
                )
                .on('transactionHash', (hash) => {
                    $("#degreeKindModal").hide();
                    $("#addKindModal").hide();
                    $("#degreeKindTable").hide();
                    alert("Vui lòng chờ xử lý giao dịch!");
                })
                .on('receipt', (receipt) => {
                    alert("Success!");
                    location.reload();
                })
                .on('confirmation', (confirmationNumber, receipt) => {

                })
                .on('error', console.err));
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
    )
}

function paginationDegreeKind() {
    $('#paginationKind').html('')
    var table = '#degreeKindTable';
    var trnum = 0;
    var maxRows = 10;
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
        console.log(count);
        for (let row = 0; row < count; row++) {
            degreeKindSessionInstance.methods.getDegreeKindAtIndex(row).call().then(function (addr) {
                degreeKindSessionInstance.methods.getDegreeKind(addr).call().then(function (result) {
                    table += `<tr>
                                <td>` + result[0] + `</td>
                                <td>` + result[1] + `</td>
                                <td>
                                    <button class="btn btn-danger btn-xs" 
                                        data-toggle="modal" data-target="#deleteModal" 
                                        onclick="createDeleteView(\`` + result[0] + `\`,\`` + result[1] + `\`)" >
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

function createDeleteView(degreeKindId, degreeKindName) {
    var parag = `<p style="text-align:center;">` + degreeKindId + `<br>` + degreeKindName + `</p>`;
    $("#deleteModal").find(".modal-body2").html(parag);
}

//delete quan ly nguoi dung
function deleteDegreeKindManagement() {
    web3.eth.getAccounts(function (error, result) {
        var tempId = web3.eth.accounts.create();
        var randomId = tempId.address;
        var idHistory = randomId;
        var account = result[0];

        var degreeKindId = $('#deleteModal .modal-body p').text();
        var id = degreeKindId.slice(0, 42);
        var date = new Date(Date.now()).toString();

        var batch = new web3.BatchRequest();

        var id1 = degreeKindId.slice(42, degreeKindId.length)
        var thaoTac = "Xóa loại văn bằng " + id1;
        batch.add(degreeKindSessionInstance.methods.deleteDegreeKind(id)
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
                }));
        batch.add(historySessionInstance.methods.InsertHistory(idHistory, account, thaoTac, date)
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
                }
            )
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
            .on('error', console.log("có lỗi MetaMask")));
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
    )
}

function createUpdateView(degreeKindId, degreeKindName) {
    var parag = `<p style="text-align: center;">` + degreeKindId + `<br>` + degreeKindName + `</p>`;
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
                        onclick="createUpdateView(\`` + degreeKindId + `\`,\`` + degreeKindName + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>`;
    $("#tableUpdateDegreeKind").find("tbody").html(table);
}

function updateDegreeKindManagement() {
    var degreeKindId = $('#insertValueUpdateDegreeKindNameModal .modal-body p').text();
    var id = degreeKindId.slice(0,42);
    var name = degreeKindId.slice(42,degreeKindId.length);

    var degreeKindName = $('#valueUpdate').val();
    var batch = new web3.BatchRequest();
    batch.add(degreeKindSessionInstance.methods.updateDegreeKindName(id, degreeKindName)
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
    web3.eth.getAccounts(function (error, result) {
        if ($('#idDegreeNameForm').parsley().validate()) {
            var temp = web3.eth.accounts.create();
            var randomAddress = temp.address;
            var degreeNameId = randomAddress;
            var degreeKindId = $("#idKindDegreeSelect").val();
            var degreeName = $("#nameDegree").val();

            var tempId = web3.eth.accounts.create();
            var randomId = tempId.address;
            var idHistory = randomId;
            var account = result[0];
            var thaoTac = "Thêm tên văn bằng " + degreeName;
            var date = new Date(Date.now()).toString();

            var batch = new web3.BatchRequest();

            console.log(degreeKindId + degreeNameId + degreeName);

            batch.add(degreeNameSessionInstance.methods.InsertDegreeName(degreeNameId, degreeKindId, degreeName)
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
                    }
                ));
            batch.add(historySessionInstance.methods.InsertHistory(idHistory, account, thaoTac, date)
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
                .on('error', console.err));
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
    )
}

function paginationLog() {
    $('#paginationLog').html('')
    var table = '#myTable';
    var trnum = 0;
    var maxRows = 20;
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
    var maxRows = 10;
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
                    select += `<option value="` + result[0] + `">` + result[1] + `</option>`;
                    $("#idKindDegreeSelect").html(select);
                })
            })
        }
    });
}

function getListDegreeName() {
    var table = "";
    degreeNameSessionInstance.methods.getDegreeNameCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            degreeNameSessionInstance.methods.getDegreeNameAtIndex(row).call().then(function (addr) {
                degreeNameSessionInstance.methods.getDegreeName(addr).call().then(function (result) {
                    degreeKindSessionInstance.methods.getDegreeKind(result[1]).call().then(function (result1) {
                        degreeKindSessionInstance.methods.isUser(result[1]).call().then(function (bool) {
                            if (bool == true) {
                                table += `<tr>
                                    <td>` + result[0] + `</td>
                                    <td>` + result1[1] + `</td>
                                    <td>` + result[2] + `</td>
                                    <td>
                                        <button class="btn btn-danger btn-xs" 
                                            data-toggle="modal" data-target="#deleteDegreeNameModal" 
                                            onclick="createDeleteDegreeNameView(\`` + result[0] + `\`,\`` + result1[1] + `\`)" >
                                            <i class="far fa-trash-alt"></i>
                                            Xóa
                                        </button>
                                        <button class="btn btn-primary btn-xs"
                                            data-toggle="modal" data-target="#updateFrontDegreeNameManagement"
                                            onclick="frontUpdateDegreeNameManagement(  
                                                \`` + result[0] + `\`,
                                                \`` + result1[1] + `\`,
                                                \`` + result[2] + `\`)" >
                                            <i class="far fa-edit"></i>
                                            Sửa
                                        </button>
                                    </td>
                            </tr>`;
                                $("#degreeNameTable").find("tbody").html(table);
                            }
                            else {
                                degreeNameSessionInstance.methods.deleteDegreeName(result[0])
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
                                        }
                                    )
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
                                    .on('error', console.log("có lỗi MetaMask"))



                    }
                    })
            })
        })
})
    }})
}

function createDeleteDegreeNameView(degreeNameId, degreeKindName) {
    var parag = `<p style="text-align:center;">` + degreeNameId + `<br>` + degreeKindName + `</p>`;
    $("#deleteDegreeNameModal").find(".modal-body1").html(parag);
}

function deleteDegreeNameManagement() {
    web3.eth.getAccounts(function (error, result) {
        var tempId = web3.eth.accounts.create();
        var randomId = tempId.address;
        var idHistory = randomId;
        var account = result[0];
        var degreeNameId = $('#deleteDegreeNameModal .modal-body p').text();
        var id = degreeNameId.slice(0, 42);

        var date = new Date(Date.now()).toString();

        var batch = new web3.BatchRequest();

        var id1 = degreeNameId.slice(42, degreeNameId.length);
        var thaoTac = "Xóa tên văn bằng " + id1;
        batch.add(degreeNameSessionInstance.methods.deleteDegreeName(id)
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
                }
            )
        );
        batch.add(historySessionInstance.methods.InsertHistory(idHistory, account, thaoTac, date)
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
                }
            )
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
            .on('error', console.log("có lỗi MetaMask")));
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
    )
}

function createUpdateDegreeNameView(degreeNameId, degreeName) {
    var parag = `<p style="text-align: center;">` + degreeNameId + `<br>` + degreeName + `</p>`;
    $("#insertValueUpdateDegreeNameModal").find(".modal-body2").html(parag);
}

function frontUpdateDegreeNameManagement(degreeNameId, degreeKindName, degreeName) {
    var table = "";
    table += `<tr>
                    <th>degreeNameId</th>
                    <td id="tdDegreeNameId">`+ degreeNameId + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>degreeKindName</th>
                    <td id="tdDegreeKindName">`+ degreeKindName + `</td>
                    <td></td>
                </tr>
                <tr>
                    <th>degreeName</th>
                    <td id="tdDegreeName">`+ degreeName + `</td>
                    <td>
                        <button class="btn btn-primary btn-xs"
                        data-toggle="modal" data-target="#insertValueUpdateDegreeNameModal"
                        onclick="createUpdateDegreeNameView(\`` + degreeNameId + `\`,\`` + degreeName + `\`)" >
                        <i class="far fa-edit"></i>
                            Sửa
                        </button>
                    </td>
                </tr>`;
    $("#tableUpdateDegreeName").find("tbody").html(table);
}

function updateDegreeNameManagement() {
    var degreeNameId = $('#insertValueUpdateDegreeNameModal .modal-body p').text();
    var degreeName = $('#valueUpdateDegreeName').val();
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

function paginationHistory() {
    $('#paginationHistory').html('')
    var table = '#historyTable';
    var trnum = 0;
    var maxRows = 20;
    var totalRows = $('#historyTable tbody tr').length;
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
            $('#paginationHistory').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#paginationHistory li:first-child').addClass('active')
    $('#paginationHistory li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#paginationHistory li').removeClass('active')
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
    setTimeout(filterByType, 3000);
    listApproveDiary();
    //panigationHistory
    $(document).ready(function () {
        var table = '#historyTable';
        setTimeout(paginationHistory, 2000);
        $('#maxRowsHistory').on('change', function () {
            $('#paginationHistory').html('')
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
                    $('#paginationHistory').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('#paginationHistory li:first-child').addClass('active')
            $('#paginationHistory li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('.paginationHistory li').removeClass('active')
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
    //setTimeout(sortTableHistory(),5000);
    getListHistory();
});

function getListHistory() {
    var table = "";
    historySessionInstance.methods.getHistoryCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            historySessionInstance.methods.getHistoryAtIndex(row).call().then(function (addr) {
                historySessionInstance.methods.getHistory(addr).call().then(function (result) {
                    table += `<tr>
                                <td>` + (parseInt(row) + 1) + `</td>
                                <td>` + result[0] + `</td>
                                <td>` + result[1] + `</td>
                                <td>` + result[2] + `</td>
                        </tr>`;
                    $("#historyTable").find("tbody").html(table);
                    document.getElementById("btn-sort").click();
                })
            })
        }
    });
}


function statusCodeByName(status) {
    switch (status) {
        case "thêm":
            return "Đợi duyệt";

        case "duyệt":
            return "Đã duyệt";

        default:
            break;
    }
}

function listApproveDiary() {
    var table = "";
    certificateSessionIntance.methods.getHisCount().call().then(function (count) {
        for (let row = 0; row < count; row++) {
            certificateSessionIntance.methods.getHisIndex(row).call().then(function (addr) {
                certificateSessionIntance.methods.getHistoryCertificate(addr).call().then(function (result) {
                    userManagementSessionInstance.methods.getUser(result[1]).call().then(function (result1) {
                        table += `<tr>
                                        <td>` + result[1] + `</td>
                                        <td>` + result1[1] + `</td>
                                        <td>` + result[2] + `</td>
                                        <td>` + statusCodeByName(result[3]) + `</td>
                                        <td>` + result[4] + `</td>
                                        <td>` + result[5] + `</td>
                                    </tr>`;
                        $("#myTable").find("tbody").html(table);
                    })
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        }
    });
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
    input = "Đã Duyệt";
    filter = input.toUpperCase(); console.log(filter);
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
