Ext.define('MyDesktop.view.projectmanagement.currentprojects.typesetterform', {
	extend : 'Ext.form.Panel',
	alias : 'widget.typesetterform',
	id : 'typesetterform',
	layout : {
		type : 'absolute'
	},
	requires : ['MyDesktop.view.projectmanagement.currentprojects.TypesetterInfoGrid', 'MyDesktop.view.projectmanagement.currentprojects.TypesetterAuthorGrid'],
	//title:'Schedule for production',
	defaults : {

		labelWidth : 90,

	},

	defaultType : 'textfield',

	initComponent : function() {

		this.items = [{
			xtype : 'label',
			text : 'General Info',
			//name: 'reviewername',
			align : 'center',
			x : 10,
			y : 10,
			width : 300,
			style : {
				'font-weight' : 'bold',
			}

		}, {
			xtype : 'tinfogrid',
			x : 5,
			y : 30
		}, 

		/*{
		 xtype:'label',
		 text : 'Typesetting Budget:',
		 align:'center',
		 x:10,
		 y:260,
		 width:300,
		 style:
		 {
		 'font-weight':'bold',
		 }
		 },
		 {
		 xtype:'label',
		 text : ' 1 set to the Production editor at CUP:	',
		 align:'center',
		 x:10,
		 y:280,
		 allowBlank: false,
		 width:300,
		 },
		 {
		 xtype : 'label',
		 text :'tbc	',
		 align:'center',
		 x:250,
		 y:280,
		 width:300,
		 allowBlank: false,
		 },
		 */
		{
			xtype : 'label',
			text : 'Author Details',
			align : 'center',
			x : 10,
			y : 280,
			width : 300,
			style : {
				'font-weight' : 'bold',
			}
		}, {
			xtype : 'tauthorgrid',
			x : 5,
			y : 300
		},
		{

		 xtype:'label',
		 text : 'Typesetting Notes',
		 align:'center',
		 x:10,
		 y:440,
		 allowBlank: false,
		 width:300,
		 style:{
		 'font-weight':'bold',
		 }
		 },
		 {
		 	xtype:'textarea',
		 	x:5,
		 	y:460,
		 	width:750,
		 },

		{
			xtype : 'button',
			text : 'Send',
			x : 300,
			y : 540,

		}, {
			xtype : 'button',
			text : 'Cancel',
			x : 250,
			y : 540,
		}];
		/*  bbar:
		 [
		 this.items = [

		 {

		 },

		 ]
		 ],*/

		this.callParent();
	}
});

