jQuery(document).ready(function() {
	var QRBox	=	$('#QRBox');
	var MainBox	=	$('#MainBox');
	var BTCQR	=	'images/qq.png';	// 二维码路径
	var AliPayQR	=	'images/AliPayQR.png';
	var WeChanQR	=	'images/WeChanSQ.png';

	

	function showQR(QR) {
		if (QR) {
			MainBox.css('background-image','url('+QR+')');
		}
		$('#DonateText,#donateBox,#github').addClass('blur');
		QRBox.fadeIn(300,function(argument) {
			MainBox.addClass('showQR');
		});
	}

	$('#donateBox>li').click(function(event) {
		var thisID	=	$(this).attr('id');
		if (thisID === 'BTC') {
			showQR(BTCQR);
			new Clipboard('#BTCBn');
		} else if (thisID === 'AliPay') {
			showQR(AliPayQR);
		} else if (thisID === 'WeChat') {
			showQR(WeChanQR);
		}
	});

	MainBox.click(function(event) {
		MainBox.removeClass('showQR').addClass('hideQR');
		setTimeout (function(a) {
			QRBox.fadeOut(300,function(argument) {
				MainBox.removeClass('hideQR');
			});
			$('#DonateText,#donateBox,#github').removeClass('blur');
		},600);

	});
});
let currentPage = 0;
let itemsPerPage = 4; // 每页显示的赞助者数
let donors = document.querySelectorAll('.donorRow');

function showPage(number) {
    // 首先隐藏所有的赞助者
    for (let i = 0; i < donors.length; i++) {
        donors[i].style.display = 'none';
    }
    // 显示指定页的赞助者
    for (let i = number * itemsPerPage; i < (number + 1) * itemsPerPage; i++) {
        if (donors[i]) {
            donors[i].style.display = '';
        }
    }
}

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    if ((currentPage + 1) * itemsPerPage < donors.length) {
        currentPage++;
        showPage(currentPage);
    }
});

// 默认显示第一页
showPage(0);