if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
ethereum.enable();
var degreeKindSessionInstance = new web3.eth.Contract(KindStorageABI, "0x80b6349F41F93eD34C94cDf482f2e06Fa12cfd34");
var degreeNameSessionInstance = new web3.eth.Contract(NameStorageABI, "0xb6A6051d57a4ACef152f22250EDE7d1A358569d7");
var certificateSessionIntance = new web3.eth.Contract(CertificateStorageABI, "0xf5E9feb556d41Ac061654A5dCfbB592FCa24A306");


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

function sortTable1() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("degreeNameTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            //check if the two rows should switch place:
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// Logic add degree kind
function addDegreeKind() {
    if ($('#idDegreeKindForm').parsley().validate()) {
        var degreeKindId = $("#idKindDegree").val();
        var degreeKindName = $("#nameKindDegree").val();

        degreeKindSessionInstance.methods.getDegreeKind(degreeKindId).call()
            .then((result) => {
                if (result[0] == 0 && result[1] == "") {
                    var currentDegreeKind = degreeKindId - 1;
                    degreeKindSessionInstance.methods.getDegreeKind(currentDegreeKind).call()
                        .then((currentResult) => {
                            if (parseInt(currentResult[0]) < degreeKindId && degreeKindId < parseInt(currentResult[0]) + 2) {
                                degreeKindSessionInstance.methods.setDegreeKind(degreeKindId, degreeKindName)
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
                                        $("#degreeKindModal").hide();
                                        $("#addKindModal").hide();
                                        $("#degreeKindTable").hide();
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
                                alert("ID không hợp lệ!");
                            }
                        });
                } else {
                    alert("ID đã tồn tại!");
                }
            });
    }
}

function degreeKindButton() {
    sortTable($('#degreeKindTable'), 'asc');
    getListDegreeKind();
    //panigation
    $(document).ready(function () {
        var table = '#degreeKindTable'
        $('#maxRows').on('change', function () {
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
    // $(document).ready( function () {
    //     $('#degreeKindTable').DataTable();
    //     getListDegreeKind();
    // } );
}
function getListDegreeKind() {
    var table = "";
    degreeKindSessionInstance.methods.getDegreeKindIndex().call()
        .then((result) => {
            for (i = 1; i <= result; i++) {
                degreeKindSessionInstance.methods.getDegreeKind(i).call()
                    .then((result) => {
                        table += `<tr>
                                    <td style="width: 5% !important;">` + result[0] + `</td>
                                    <td style="wdth: 60% !important;">` + result[1] + `</td>
                                    <td style="wiidth: 35% !important;">
                                    <button id="delDegreeKind" class="btn btn-danger btn-xs" onclick="deleteDegreeKind()">
                                        <i class="far fa-trash-alt"></i>
                                        Xóa
                                    </button>
                                    <button class="btn btn-primary btn-xs">
                                        <i class="far fa-edit"></i>
                                        Sửa
                                    </button>
                                    </td>
                                </tr>`;
                        $("#degreeKindTable").find("tbody").html(table);
                    });
            }
        });
}


function addDegreeKind() {

    degreeKindSessionInstance.methods.delDegreeKind().call()
        .then(console.log)

}
// $(document).ready( function abc() {
//     $('#degreeKindTable').DataTable();
// } );
// Logic add degree name

function addDegreeName() {

    if ($('#idDegreeNameForm').parsley().validate()) {
        var degreeKindId = $("#idKindDegreeSelect").val();
        var degreeNameId = $("#idDegreeName").val();
        var degreeName = $("#nameDegree").val();
        console.log(degreeKindId + degreeNameId + degreeName);
        degreeNameSessionInstance.methods.getDegreeName(degreeNameId).call()
            .then((result) => {
                //khong duoc null
                if (result[0] == 0 && result[1] == 0 && result[2] == "") {
                    var currentDegreeName = degreeNameId - 1;
                    degreeNameSessionInstance.methods.getDegreeName(currentDegreeName).call()
                        .then((currentResult) => {
                            //lastCurrentVale<newValue< lastCurrentValue+2
                            if (parseInt(currentResult[1]) < degreeNameId && degreeNameId < parseInt(currentResult[1]) + 2) {
                                degreeNameSessionInstance.methods.setDegreeName(degreeKindId, degreeNameId, degreeName)
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
                                        $("#degreeNameModal").hide();
                                        $("#addNameModal").hide();
                                        $("#degreeNameTable").hide();
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
                                alert("ID không hợp lệ!");
                            }
                        });
                } else {
                    alert("ID đã tồn tại!");
                }
            });
    }
}

function addDegreeName() {

    if ($('#idDegreeNameForm').parsley().validate()) {
        var degreeKindId = $("#idKindDegreeSelect").val();
        var degreeNameId = $("#idDegreeName").val();
        var degreeName = $("#nameDegree").val();
        console.log(degreeKindId + degreeNameId + degreeName);
        degreeNameSessionInstance.methods.getDegreeName(degreeNameId).call()
            .then((result) => {
                //khong duoc null
                if (result[0] == 0 && result[1] == 0 && result[2] == "") {
                    var currentDegreeName = degreeNameId - 1;
                    degreeNameSessionInstance.methods.getDegreeName(currentDegreeName).call()
                        .then((currentResult) => {
                            //lastCurrentVale<newValue< lastCurrentValue+2
                            if (parseInt(currentResult[1]) < degreeNameId && degreeNameId < parseInt(currentResult[1]) + 2) {
                                degreeNameSessionInstance.methods.setDegreeName(degreeKindId, degreeNameId, degreeName)
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
                                        $("#degreeNameModal").hide();
                                        $("#addNameModal").hide();
                                        $("#degreeNameTable").hide();
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
                                alert("ID không hợp lệ!");
                            }
                        });
                } else {
                    alert("ID đã tồn tại!");
                }
            });
    }
}

function pag() {
    $('.pagination').html('')
    var table = '#myTable';
    var trnum = 0;
    var maxRows = 5;
    var totalRows = $('#myTable tbody tr').length;
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

function pag1() {
    $('#pagination1').html('')
    var table = '#degreeKindTable';
    var trnum = 0;
    var maxRows = 10;
    var totalRows = $('#degreeKindTable tbody tr').length;
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
            $('#pagination1').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#pagination1 li:first-child').addClass('active')
    $('#pagination1 li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#pagination1 li').removeClass('active')
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

function pag2() {
    $('#pagination2').html('')
    var table = '#degreeNameTable';
    var trnum = 0;
    var maxRows = 10;
    var totalRows = $('#degreeNameTable tbody tr').length;
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
            $('#pagination2').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
        }
    }
    $('#pagination2 li:first-child').addClass('active')
    $('#pagination2 li').on('click', function () {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0
        $('#pagination2 li').removeClass('active')
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
    listApproveDiary();

    $(document).ready(function () {
        var table = '#myTable';
        setTimeout(pag, 1000);

        $('#datatable').on('change', function () {
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

    $(document).ready(function () {
        var table = '#degreeKindTable';
        setTimeout(pag1, 1000);

        $('#maxRows').on('change', function () {
            $('#pagination1').html('')
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
                    $('#pagination1').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('#pagination1 li:first-child').addClass('active')
            $('#pagination1 li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('#pagination1 li').removeClass('active')
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
    $(document).ready(function () {
        var table = '#degreeNameTable';
        setTimeout(pag2, 1000);

        $('#maxRowsName').on('change', function () {
            $('#pagination2').html('')
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
                    $('#pagination2').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\ </li>').show()
                }
            }
            $('#pagination2 li:first-child').addClass('active')
            $('#pagination2 li').on('click', function () {
                var pageNum = $(this).attr('data-page')
                var trIndex = 0
                $('#pagination2 li').removeClass('active')
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


function degreeNameButton() {
    getListDegreeName();
    $(document).ready(function () {
        var table = '#degreeNameTable'
        $('#maxRowsName').on('change', function () {
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
    getItemsSelectOption();
}

function getItemsSelectOption() {
    var select = `<option value="" selected disabled>Chọn loại văn bằng</option>`;
    degreeKindSessionInstance.methods.getDegreeKindIndex().call()
        .then((result) => {
            for (i = 1; i <= result; i++) {
                degreeKindSessionInstance.methods.getDegreeKind(i).call()
                    .then((result) => {
                        select += `<option value="` + result[0] + `">` + result[1] + `</option>`;
                        $("#idKindDegreeSelect").html(select);
                    });
            }
        });
}

function getListDegreeName() {
    var table = "";
    degreeNameSessionInstance.methods.getDegreeNameIndex().call()
        .then((result) => {
            for (i = 1; i <= result; i++) {
                degreeNameSessionInstance.methods.getDegreeName(i).call()
                    .then((result) => {
                        table += `<tr>
                                        <td>` + result[0] + `</td>
                                        <td>` + result[1] + `</td>
                                        <td>` + result[2] + `</td>
                                        <td>
                                        <button class="btn btn-danger btn-xs">
                                            <i class="far fa-trash-alt"></i>
                                            Xóa
                                        </button>
                                        <button class="btn btn-primary btn-xs">
                                            <i class="far fa-edit"></i>
                                            Sửa
                                        </button>
                                        </td>
                                    </tr>`;
                        $("#degreeNameModal").find("tbody").html(table);
                    });
            }
        });
}

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
    certificateSessionIntance.getPastEvents('setUserConfirmCertificateEvent',
        {
            fromBlock: 0,
            filter: { _status: "DONE" }
        }).then(function (eventUser) {
            certificateSessionIntance.getPastEvents('setCertificateEvent',
                { fromBlock: 0 }
            ).then(function (eventCer) {
                for (var i = 0; i < eventUser.length; i++) {
                    for (var i = 0; i < eventCer.length; i++) {
                        var res = eventCer[i];
                        var id = res.returnValues._id;
                        var status = res.returnValues._status;
                        var resUser = eventUser[i];
                        var userId = resUser.returnValues._userId;
                        //var user Id = "B1401025";
                        var userName = resUser.returnValues._userName;
                        //var userName = "Trần Công Án";
                        var dateTime = resUser.returnValues._dateTime;
                        var date = Date(dateTime);
                        var comment = resUser.returnValues._comment;
                        //var comment = "Văn bằng thỏa điều kiện - Duyệt";

                        table += `<tr>
                                        <td>` + userId + `</td>
                                        <td>` + userName + `</td>
                                        <td>` + id + `</td>
                                        <td>` + statusCodeByName(status) + `</td>
                                        <td>` + date.toString() + `</td>
                                        <td>` + comment + `</td>
                                    </tr>`;
                        $("#myTable").find("tbody").html(table);
                    }
                    //$("#myTable").find("tbody").html(table);
                }
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
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
// function degreeManagementButton() {
//     listDegreeManagement();
// }

// function listDegreeManagement() {
//     var table = getListDegreeManagement();
//     $("#degreeManagementModal").find("tbody").html(table);
// }

// function getListDegreeManagement() {
//     var table = "";
//     for (var i = 0; i < 3; i++) {
//         table += `<tr id="` + i + `">
//         <td onclick="edit(` + i + `, 'Tiger Nixon','System Architect','2019/04/25')">Tiger Nixon</td>
//         <td onclick="edit(` + i + `, 'Tiger Nixon','System Architect','2019/04/25')">System Architect</td>
//         <td onclick="edit(` + i + `, 'Tiger Nixon','System Architect','2019/04/25')">2019/04/25</td>
//         <td class="center"><button type="button" class="close" onclick="deleteAuth(` + i + `)"><i class="fa fa-fw fa-close btn-remove"></i></button></i></td>
//         </tr>`;
//     }
//     return table;
// }

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

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();