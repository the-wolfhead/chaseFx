$(document).ready(function () {

	$('.ham').click(function () {
		$('.landing-nav').toggleClass('show-landing-nav');
		$('.ham').toggleClass('p-left-100');
	});

	// this is for the current stuff
	$('.eursd').click(function () {
		$('.eursd-head').show();

		$('.eursd').addClass('w-50px');
		$('.gbpusd').removeClass('w-50px');
		$('.usdjpy').removeClass('w-50px');
		$('.audusd').removeClass('w-50px');
		$('.eurgbp').removeClass('w-50px');



		$('.gbpusd-head').hide();
		$('.usdjpy-head').hide();
		$('.audusd-head').hide();
		$('.eurgbp-head').hide();


	});

	$('.gbpusd').click(function () {
		$('.gbpusd-head').show();

		$('.gbpusd').addClass('w-50px');
		$('.eursd').removeClass('w-50px');
		$('.usdjpy').removeClass('w-50px');
		$('.audusd').removeClass('w-50px');
		$('.eurgbp').removeClass('w-50px');



		$('.eursd-head').hide();
		$('.usdjpy-head').hide();
		$('.audusd-head').hide();
		$('.eurgbp-head').hide();


	});

	$('.usdjpy').click(function () {
		$('.usdjpy-head').show();

		$('.usdjpy').addClass('w-50px');
		$('.eursd').removeClass('w-50px');
		$('.gbpusd').removeClass('w-50px');
		$('.audusd').removeClass('w-50px');
		$('.eurgbp').removeClass('w-50px');



		$('.eursd-head').hide();
		$('.gbpusd-head').hide();
		$('.audusd-head').hide();
		$('.eurgbp-head').hide();


	});

	$('.audusd').click(function () {
		$('.audusd-head').show();

		$('.audusd').addClass('w-50px');
		$('.eursd').removeClass('w-50px');
		$('.gbpusd').removeClass('w-50px');
		$('.usdjpy').removeClass('w-50px');
		$('.eurgbp').removeClass('w-50px');



		$('.usdjpy-head').hide();
		$('.gbpusd-head').hide();
		$('.eursd-head').hide();
		$('.eurgbp-head').hide();


	});

	$('.eurgbp').click(function () {
		$('.eurgbp-head').show();

		$('.eurgbp').addClass('w-50px');
		$('.eursd').removeClass('w-50px');
		$('.gbpusd').removeClass('w-50px');
		$('.usdjpy').removeClass('w-50px');
		$('.audusd').removeClass('w-50px');



		$('.usdjpy-head').hide();
		$('.gbpusd-head').hide();
		$('.eursd-head').hide();
		$('.audusd-head').hide();


	});

	// ===========================this is for the account section in the dashboard 
	// ============================
	$('.col-toggle-2').click(function () {
		$('.card-1').hide();
		$('.card-3').hide();
		$('.card-2').show();
	});

	// ============================
	$('.col-toggle-3').click(function () {
		$('.card-1').hide();
		$('.card-2').hide();
		$('.card-3').show();
	});

	// ============================
	$('.col-toggle-1').click(function () {
		$('.card-2').hide();
		$('.card-3').hide();
		$('.card-1').show();
	});

	$('.category').click(function () {
		$('.live_forex_drop_down').toggleClass('hide-deg');
	});

	$('.time_head').click(function () {
		$('.time_drop').toggleClass('hide-deg');
	});

	$('.li_crypto').click(function () {
		$('.main_forex').html('<span> Crypto </span>');
		$('.crypto_src').show();
		$('.stock_src').hide();
		$('.forex_src').hide();


	});

	$('.li_forex').click(function () {
		$('.main_forex').html('<span> Forex </span>');
		$('.crypto_src').hide();
		$('.stock_src').hide();
		$('.forex_src').show();

	});

	$('.li_stock').click(function () {
		$('.main_forex').html('<span> Stock </span>');
		$('.crypto_src').hide();
		$('.stock_src').show();
		$('.forex_src').hide();

	});



	// this is the one for the trade option 

	$('.li_turbo').click(function () {
		$('.main_option').html(' Turbo ');
	});

	$('.li_intraday').click(function () {
		$('.main_option').html('<span> Intra Day </span>');
	});

	$('.li_long').click(function () {
		$('.main_option').html('<span> Long Term </span>');
	});

	$('.option_type_head').click(function () {
		$('.live_option_drop').toggleClass('hide-deg');
	});

	$('.button_switch').click(function () {

		$('.btn_toggle').toggleClass('move');
	});

	// =================================this is the call section 

	$('.acc_drop_head').hover(function () {
		$('.acc_drop').toggleClass('show_opa');
	});

	$('.state_drop_head').hover(function () {
		$('.state_drop').toggleClass('show_opa');
	});

	$('.setting_drop_head').hover(function () {
		$('.setting_drop').toggleClass('show_opa');
	});
	// this is for the hamburger 
	$('.ham').click(function () {
		$('.list-nav ul').toggleClass('nav-show');
		$('.list-nav').toggleClass('list-nav2');
	});

	$('.ham2').click(function () {
		$('.category').toggleClass('display');
		$('.tr-forex').toggleClass('display');
	});
	// ========================================================== funding styling ========================================
	$('.ltc').click(function () {

		$('.ltc').addClass('method-active2');
		$('.ltc div').addClass('method-active');

		$('.btc div').removeClass('method-active');
		$('.btc').removeClass('method-active2');

		$('.wes div').removeClass('method-active');
		$('.wes').removeClass('method-active2');

		$('.mgr div').removeClass('method-active');
		$('.mgr').removeClass('method-active2');

		$('.eth div').removeClass('method-active');
		$('.eth').removeClass('method-active2');

		$('.transfer div').removeClass('method-active');
		$('.transfer').removeClass('method-active2');

		$('.pmo div').removeClass('method-active');
		$('.pmo').removeClass('method-active2');

		$('.net div').removeClass('method-active');
		$('.net').removeClass('method-active2');

		// this is for the buttons of transfer
		$('#btc_btn').hide();
		$('#wes_btn').hide();
		$('#mgr_btn').hide();
		$('#eth_btn').hide();
		$('#transfer_btn').hide();
		$('#pmo_btn').hide();
		$('#net_btn').hide();
		$('#ltc_btn').show();


		$('.funding-text').html('Litecoin:');

		// this is for the mobile view 

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('Litecoin');
		$('.localbtc').hide();

	});

	$('.btc').click(function () {

		$('.btc').addClass('method-active2');
		$('.btc div').addClass('method-active');

		$('.ltc div').removeClass('method-active');
		$('.ltc').removeClass('method-active2');

		$('.wes div').removeClass('method-active');
		$('.wes').removeClass('method-active2');

		$('.mgr div').removeClass('method-active');
		$('.mgr').removeClass('method-active2');

		$('.eth div').removeClass('method-active');
		$('.eth').removeClass('method-active2');

		$('.transfer div').removeClass('method-active');
		$('.transfer').removeClass('method-active2');

		$('.pmo div').removeClass('method-active');
		$('.pmo').removeClass('method-active2');

		$('.net div').removeClass('method-active');
		$('.net').removeClass('method-active2');

		$('.funding-text').html('Bitcoin:');

		// this is for the mobile view 

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('Bitcoin');
		$('.localbtc').show();

		// this is for the buttons of transfer
		$('#btc_btn').show();
		$('#wes_btn').hide();
		$('#mgr_btn').hide();
		$('#eth_btn').hide();
		$('#transfer_btn').hide();
		$('#pmo_btn').hide();
		$('#net_btn').hide();
		$('#ltc_btn').hide();

	});



	$('.wes').click(function () {

		$('.wes').addClass('method-active2');
		$('.wes div').addClass('method-active');

		$('.ltc div').removeClass('method-active');
		$('.ltc').removeClass('method-active2');

		$('.btc div').removeClass('method-active');
		$('.btc').removeClass('method-active2');

		$('.mgr div').removeClass('method-active');
		$('.mgr').removeClass('method-active2');

		$('.eth div').removeClass('method-active');
		$('.eth').removeClass('method-active2');

		$('.transfer div').removeClass('method-active');
		$('.transfer').removeClass('method-active2');

		$('.pmo div').removeClass('method-active');
		$('.pmo').removeClass('method-active2');

		$('.net div').removeClass('method-active');
		$('.net').removeClass('method-active2');

		$('.funding-text').html('Western Union:');

		// this is for the mobile view 

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('Western Union');
		$('.localbtc').hide();

		// this is for the buttons of transfer
		$('#btc_btn').hide();
		$('#wes_btn').show();
		$('#mgr_btn').hide();
		$('#eth_btn').hide();
		$('#transfer_btn').hide();
		$('#pmo_btn').hide();
		$('#net_btn').hide();
		$('#ltc_btn').hide();


	});

	$('.mgr').click(function () {

		$('.mgr').addClass('method-active2');
		$('.mgr div').addClass('method-active');

		$('.ltc div').removeClass('method-active');
		$('.ltc').removeClass('method-active2');

		$('.wes div').removeClass('method-active');
		$('.wes').removeClass('method-active2');

		$('.btc div').removeClass('method-active');
		$('.btc').removeClass('method-active2');

		$('.eth div').removeClass('method-active');
		$('.eth').removeClass('method-active2');

		$('.transfer div').removeClass('method-active');
		$('.transfer').removeClass('method-active2');

		$('.pmo div').removeClass('method-active');
		$('.pmo').removeClass('method-active2');

		$('.net div').removeClass('method-active');
		$('.net').removeClass('method-active2');

		$('.funding-text').html('MoneyGram:');

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('MoneyGram');
		$('.localbtc').hide();

		// this is for the buttons of transfer
		$('#btc_btn').hide();
		$('#wes_btn').hide();
		$('#mgr_btn').show();
		$('#eth_btn').hide();
		$('#transfer_btn').hide();
		$('#pmo_btn').hide();
		$('#net_btn').hide();
		$('#ltc_btn').hide();


	});

	$('.eth').click(function () {

		$('.eth').addClass('method-active2');
		$('.eth div').addClass('method-active');

		$('.ltc div').removeClass('method-active');
		$('.ltc').removeClass('method-active2');

		$('.wes div').removeClass('method-active');
		$('.wes').removeClass('method-active2');

		$('.btc div').removeClass('method-active');
		$('.btc').removeClass('method-active2');

		$('.mgr div').removeClass('method-active');
		$('.mgr').removeClass('method-active2');

		$('.transfer div').removeClass('method-active');
		$('.transfer').removeClass('method-active2');

		$('.pmo div').removeClass('method-active');
		$('.pmo').removeClass('method-active2');

		$('.net div').removeClass('method-active');
		$('.net').removeClass('method-active2');

		$('.funding-text').html('Ethereum:');

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('Ethereum');
		$('.localbtc').hide();

		// this is for the buttons of transfer
		$('#btc_btn').hide();
		$('#wes_btn').hide();
		$('#mgr_btn').hide();
		$('#eth_btn').show();
		$('#transfer_btn').hide();
		$('#pmo_btn').hide();
		$('#net_btn').hide();
		$('#ltc_btn').hide();


	});

	$('.transfer').click(function () {

		$('.transfer').addClass('method-active2');
		$('.transfer div').addClass('method-active');

		$('.ltc div').removeClass('method-active');
		$('.ltc').removeClass('method-active2');

		$('.wes div').removeClass('method-active');
		$('.wes').removeClass('method-active2');

		$('.btc div').removeClass('method-active');
		$('.btc').removeClass('method-active2');

		$('.mgr div').removeClass('method-active');
		$('.mgr').removeClass('method-active2');

		$('.eth div').removeClass('method-active');
		$('.eth').removeClass('method-active2');

		$('.pmo div').removeClass('method-active');
		$('.pmo').removeClass('method-active2');

		$('.net div').removeClass('method-active');
		$('.net').removeClass('method-active2');

		$('.funding-text').html('Bank Transfer:');

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('Bank Transfer');
		$('.localbtc').hide();

		// this is for the buttons of transfer
		$('#btc_btn').hide();
		$('#wes_btn').hide();
		$('#mgr_btn').hide();
		$('#eth_btn').hide();
		$('#transfer_btn').show();
		$('#pmo_btn').hide();
		$('#net_btn').hide();
		$('#ltc_btn').hide();


	});

	$('.pmo').click(function () {

		$('.pmo').addClass('method-active2');
		$('.pmo div').addClass('method-active');

		$('.ltc div').removeClass('method-active');
		$('.ltc').removeClass('method-active2');

		$('.wes div').removeClass('method-active');
		$('.wes').removeClass('method-active2');

		$('.btc div').removeClass('method-active');
		$('.btc').removeClass('method-active2');

		$('.mgr div').removeClass('method-active');
		$('.mgr').removeClass('method-active2');

		$('.eth div').removeClass('method-active');
		$('.eth').removeClass('method-active2');

		$('.transfer div').removeClass('method-active');
		$('.transfer').removeClass('method-active2');

		$('.net div').removeClass('method-active');
		$('.net').removeClass('method-active2');

		$('.funding-text').html('Perfect Money: ');

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('Perfect Money');
		$('.localbtc').hide();

		// this is for the buttons of transfer
		$('#btc_btn').hide();
		$('#wes_btn').hide();
		$('#mgr_btn').hide();
		$('#eth_btn').hide();
		$('#transfer_btn').hide();
		$('#pmo_btn').show();
		$('#net_btn').hide();
		$('#ltc_btn').hide();


	});

	$('.net').click(function () {

		$('.net').addClass('method-active2');
		$('.net div').addClass('method-active');

		$('.ltc div').removeClass('method-active');
		$('.ltc').removeClass('method-active2');

		$('.wes div').removeClass('method-active');
		$('.wes').removeClass('method-active2');

		$('.btc div').removeClass('method-active');
		$('.btc').removeClass('method-active2');

		$('.mgr div').removeClass('method-active');
		$('.mgr').removeClass('method-active2');

		$('.eth div').removeClass('method-active');
		$('.eth').removeClass('method-active2');

		$('.transfer div').removeClass('method-active');
		$('.transfer').removeClass('method-active2');

		$('.pmo div').removeClass('method-active');
		$('.pmo').removeClass('method-active2');

		$('.funding-text').html('Net Teller:');

		$('.fund-meth ul').removeClass('hide-deg');
		$('.funding-head-txt').html('Net Teller');
		$('.localbtc').hide();

		// this is for the buttons of transfer
		$('#btc_btn').hide();
		$('#wes_btn').hide();
		$('#mgr_btn').hide();
		$('#eth_btn').hide();
		$('#transfer_btn').hide();
		$('#pmo_btn').hide();
		$('#net_btn').show();
		$('#ltc_btn').hide();


	});

	$('.funding-head').click(function () {
		$('.fund-meth ul').toggleClass('hide-deg');
	});
	
		$('.per_info').click(function () {
		$('.drop_amount ul').toggleClass('live_forex_drop_down');
		
	});
	
		$('.mobile_per_money').click(function () {
		$('.mobile_per_money_others').toggleClass('live_forex_drop_down');

	});






	// now we will create for the nav bar 
	$(window).on('scroll', function () {
		// var navbar = $('.col-nav');
		if ($(window).scrollTop() > 80) {
			$('.col-f-nav').addClass('nav-back', 4000, 'ease');
		} else {
			$('.col-f-nav').removeClass('nav-back', 4000, 'ease');
		}
	});

	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})


	// ===========================
});