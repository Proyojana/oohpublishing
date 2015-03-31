var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.CurrencyRate.CurrencyRateAddForm',
		{
			extend : 'Ext.form.Panel',
			alias : 'widget.currencyrateaddform',
			id : 'currencyrateaddform',
			margin : '10 10 10 10',
			// requires:['MyDesktop.view.mastermanagement.Customers.ContactGrid'],
			layout : {
				type : 'absolute'
			},
			frame : true,
			height : 270,
			title : 'Add/Edit Currency Rate',
			defaults : {
				labelWidth : 90
				,
			},
			defaultType : 'textfield',
			initComponent : function() {

				this.items = [{
							id : 'currency_rate_id',
							hidden : true
						}, {
							xtype : 'numberfield',
							id : 'currency_rate_gbp',
							hideTrigger : true,
							minValue : 0,
							fieldLabel : '1 GBP =',
							Name : 'currency_rate_gbp',
							align : 'center',
							x : 10,
							y : 10,
							width : 260,
							allowBlank : false,
							afterLabelTextTpl : required
							,
						}, {
							xtype : 'label',
							forId : 'currency_rate_usd',
							text : 'USD',
							x : 280,
							y : 13
							,
						},

						{
							xtype : 'datefield',
							format : 'd/m/y',
							id : 'currency_rate_from',
							fieldLabel : 'From',
							Name : 'currency_rate_from',
							align : 'center',
							x : 10,
							y : 60,
							width : 250,
							allowBlank : false,
							afterLabelTextTpl : required
							,
						},

						{
							xtype : 'datefield',
							format : 'd/m/y',
							id : 'currency_rate_to',
							fieldLabel : 'To',
							Name : 'currency_rate_to',
							align : 'center',
							x : 300,
							y : 60,
							width : 250,
							allowBlank : false,
							afterLabelTextTpl : required
							,
						}, {
							xtype : 'button',
							text : 'Add',
							iconCls : 'button_add',
							id : 'add_currency_rate',
							x : 350,
							y : 150,
							width : 75,
							handler : function() {
								var currentForm = this.up('currencyrateform');
								var currency_rate_gbp = Ext
										.getCmp('currency_rate_gbp').getValue();
								var currency_rate_from = Ext
										.getCmp('currency_rate_from')
										.getValue();
								var currency_rate_to = Ext
										.getCmp('currency_rate_to').getValue();

								if (currentForm.getForm().isValid() == true) {
									var conn = new Ext.data.Connection();
									conn.request({
										url : 'service/CurrencyRate.php',
										method : 'POST',
										params : {
											action : 2,
											currency_rate_gbp : currency_rate_gbp,
											currency_rate_from : currency_rate_from,
											currency_rate_to : currency_rate_to
										},
										success : function(response) {
											obj = Ext.JSON
													.decode(response.responseText);
											Ext.Msg.alert('Message',
													obj.message);
											currentForm.getForm().reset();
											Ext.getCmp('currencyrategrid')
													.getStore().reload();
											Ext.getCmp('currencyratetab').layout
													.setActiveItem('currencyrategrid');

										}
									});
								} else {
									Ext.MessageBox
											.alert('Please fill the required data.');

								}
							}
						}, {
							xtype : 'button',
							text : 'Edit/Save',
							iconCls : 'editClass',
							id : 'edit_currency_rate',
							align : 'center',
							x : 450,
							y : 150,
							width : 75,
							handler : function() {
								var currentForm = this.up('currencyrateform');
								var currency_rate_id = Ext.getCmp('currency_rate_id').getValue();
								//alert(currency_rate_id);
								var currency_rate_gbp = Ext.getCmp('currency_rate_gbp').getValue();
								var currency_rate_from = Ext.getCmp('currency_rate_from').getValue();
								var currency_rate_to = Ext.getCmp('currency_rate_to').getValue();
								if (currentForm.getForm().isValid() == true) {
									var conn = new Ext.data.Connection();
									conn.request({
										url : 'service/CurrencyRate.php',
										method : 'POST',
										params : {
											action : 5,
											currency_rate_id : currency_rate_id,
											currency_rate_gbp : currency_rate_gbp,
											currency_rate_from : currency_rate_from,
											currency_rate_to : currency_rate_to
										},
										success : function(response) {
											obj = Ext.JSON.decode(response.responseText);
											Ext.Msg.alert('Message',obj.message);
											currentForm.getForm().reset();
											Ext.getCmp('currencyrategrid').getStore().reload();
											Ext.getCmp('currencyrategrid').getView().refresh();
										}
									});
								} else {
									Ext.MessageBox.alert('Please fill the required data.');
								}
							}
						},
						{
							xtype : 'button',
							text : 'Reset',
							iconCls : 'reset_currency_rate',
							id:'reset_currency_rate',
							x : 550,
							y : 150,
							width : 75,
							handler : function() {
								var currentForm = this.up('currencyrateform');
								currentForm.getForm().reset();
							}
						}]

				this.callParent();
			}

		});
