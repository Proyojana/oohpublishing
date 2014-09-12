var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.author.newprojectAuthorForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.newprojectauthorform',
	id:'newprojectauthorform',
	margin: '10 10 10 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.author.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.ContribGrid','MyDesktop.view.projectmanagement.newproject.author.newprojectAuthorHeaderForm','MyDesktop.view.projectmanagement.newprojectBudget.accountReceivableGrid_a'],
	title:'Author',
	defaults: {
		labelWidth: 120,
	},
	defaultType: 'textfield',

	initComponent: function() {

		this.items = [
		// Job code field
	/*	{
			x:10,
			y:10,
			xtype:'textfield',
			fieldLabel : 'Job #',
			id:'job_author_code',
			allowBlank: false,
			afterLabelTextTpl: required,
			listeners: {
              specialkey: function(f,e){
                if (e.getKey() == e.ENTER) {
                	var job_code= Ext.getCmp('job_author_code').getValue();
                	
                	 
                	 var gridAuthor=Ext.getCmp('new_author_grid');
					gridAuthor.getStore().load({params:{action:2,job_code:job_code}});
					
					 var gridAuthor=Ext.getCmp('new_contrib_grid');
					gridAuthor.getStore().load({params:{action:4,job_code:job_code}});
            
            
                }
              }
             }

		},*/
		{
			xtype:'newprojectAuthorHeaderForm',
			y:0
		},
		// Calling Author/ Editor Grid
		{
			xtype:'new_author_grid',
			y:70,

		},
		// Calling Contributor Grid
		{
			xtype:'new_contrib_grid',
			x:1,
			y:280,
			height:190
		},
		
		//starts
		
		{
xtype:'button',
text:'Save',
width:100,
x:300,
y:480,
handler:function(){
var job_code=Ext.getCmp('job_code').getValue();
//alert(job_code);
var c='';var d='';
var e=''; var f='';
var g=''; var h='';
var i=''; var b='';
var grid=Ext.getCmp('new_author_grid');

var myStore = Ext.getCmp('new_author_grid').getStore();
myStore.each(function(rec) {
b=b+rec.get('id')+',';
c=c+rec.get('author')+',';
d=d+rec.get('name')+',';
e=e+rec.get('address')+'_';
f=f+rec.get('email')+',';
g=g+rec.get('phone')+',';
h=h+rec.get('see_proof')+',';
i=i+rec.get('no_proof')+',';
});
//alert(e);
// alert(b);
//alert(tid);
// alert(secid);
var conn = new Ext.data.Connection();
conn.request({
url: 'service/Author.php',
method: 'POST',
params : {action:1,id:b,job_code:job_code,author:c,name:d,address:e,email:f,phone:g,see_proof:h,no_proof:i},
success:function(response){
obj = Ext.JSON.decode(response.responseText);
//Ext.Msg.alert('Message', obj.message);
}
});
var currentForm = Ext.getCmp('newprojectBudgetHeaderForm');
/***load data in header form****/


currentForm.getForm().load({
url: 'service/budget.php',
params: {
action:2,job_code:job_code
},
failure: function(form, action){
Ext.Msg.alert("Load failed", action.result.errorMessage);
}


});
/*var grid3=Ext.getCmp('accountPayableGrid');
grid3.getStore().load({params:{action:1,job_code:job_code}});*/
var grid3=Ext.getCmp('new_author_grid');
grid3.getStore().load({params:{action:2,job_code:job_code}});
//Ext.getCmp('newprojectbudgetformTab').setDisabled(false);
Ext.getCmp('newprojectauthorformTab').setDisabled(false);



/**for contributor grid**/
var job_code=Ext.getCmp('job_code').getValue();
var c='';var d='';
var e=''; var f='';
var g=''; var h='';
var i=''; var b='';
var grid=Ext.getCmp('new_author_grid');

var myStore = Ext.getCmp('new_contrib_grid').getStore();
myStore.each(function(rec) {
b=b+rec.get('id')+',';
c=c+rec.get('chap_num')+',';
d=d+rec.get('contrib_name')+',';
e=e+rec.get('email')+',';
f=f+rec.get('see_proof')+',';
g=g+rec.get('proof_sent')+',';
h=h+rec.get('proof_back')+',';
// i=i+rec.get('no_proof')+',';
});
//alert(e);
//alert(d);
//alert(tid);
// alert(secid);
var conn = new Ext.data.Connection();
conn.request({
url: 'service/Author.php',
method: 'POST',
params : {action:3,id:b,job_code:job_code,chap_num:c,contrib_name:d,email:e,see_proof:f,proof_sent:g,proof_back:h},
success:function(response){
obj = Ext.JSON.decode(response.responseText);
Ext.Msg.alert('Message', obj.message);
}
});

var grid3=Ext.getCmp('new_contrib_grid');
grid3.getStore().load({params:{action:4,job_code:job_code}});
Ext.getCmp('newprojectbudgetformTab').setDisabled(false);

//--------------

}
},

		
		
		
		//ends
		{
			xtype:'button',
			text:'Next',
			width:100,
			x:500,
			y:480,
			handler:function (){
				var job_code=Ext.getCmp('job_code').getValue(); 
				var currentForm = Ext.getCmp('newprojectBudgetHeaderForm');
                	 /****load data in header form*****/
                	
						; 
						currentForm.getForm().load({
   								 url: 'service/budget.php',
							     params: {
        						 	action:2,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
					var grid3=Ext.getCmp('accountPayableGrid');
									grid3.getStore().load({params:{action:1,job_code:job_code}});
					var grid4=Ext.getCmp('accountReceiveGrid_a');
									grid4.getStore().load({params:{action:10,job_code:job_code}});
					var grid3=Ext.getCmp('new_author_grid');
									grid3.getStore().load({params:{action:2,job_code:job_code}});
					Ext.getCmp('newprojectbudgetformTab').setDisabled(false);	
					Ext.getCmp('newprojectauthorformTab').setDisabled(false);
					Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectbudgetformTab');	
			}
		}

		]

		this.callParent();
	}
});