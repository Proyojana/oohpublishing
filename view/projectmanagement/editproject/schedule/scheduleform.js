Ext.define('MyDesktop.view.projectmanagement.editproject.schedule.scheduleform', {
	extend : 'Ext.form.Panel',
	alias : 'widget.scheduleform',
	id : 'scheduleform',
	layout : {
		type : 'absolute'
	},
	requires : ['MyDesktop.view.projectmanagement.editproject.schedule.scheduleInfoGrid','MyDesktop.view.projectmanagement.editproject.schedule.scheduledetails',],
	//title:'Schedule for production',
	defaults : {

		labelWidth : 90,

	},

	defaultType : 'textfield',

	initComponent : function() {

		this.items = [{
			xtype : 'label',
			text : 'Schedule Grid',
			//name: 'reviewername',
			align : 'center',
			x : 10,
			y : 10,
			width : 300,
			style : {
				'font-weight' : 'bold',
			}

		}, {
			xtype : 'scheduleInfoGrid',
			x : 5,
			y : 30
		}, 
		 {

		 xtype:'label',
		 text : 'Schedule Header Data',
		 align:'center',
		 x:10,
		 y:250,
		 allowBlank: false,
		 width:300,
		 style:{
		 'font-weight':'bold',
		 }
		 },
		 {
		 	xtype:'scheduledetails',
		 	x:5,
		 	y:270,
		 	height:90
		 },

		];
		
		this.callParent();
	}
});

