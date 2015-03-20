
Ext.define('MyDesktop.view.mastermanagement.CurrencyRate.CurrencyRateForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.currencyrateform',
   		id:'currencyrateform',
    margin: '10 10 10 10',
    //height:280,
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.CurrencyRate.CurrencyRateAddForm','MyDesktop.view.mastermanagement.CurrencyRate.CurrencyRateGrid'],
    title:'Currency Rate',
    defaults: {
        labelWidth: 140,
    },
    //defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'currencyrategrid'
		},
		{
			xtype:'currencyrateaddform',
			x:0,
			y:210,
			height:240
		},
		] 
	
		this.callParent();
	}
     
}); 
