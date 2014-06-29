Ext.define('MyDesktop.view.projectmanagement.currentprojects.typesetterform' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.typesetterform',
   		id:'typesetterform',
  //  margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
//	frame:true,
//title:'Typesetting Report',
		//requires:['MyDesktop.view.projectmanagement.scheduleGrid','MyDesktop.view.projectmanagement.ScheduleAddForm11'],
    //title:'Schedule for production',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		/* {
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId',
			html: '',
		//	 margin:'0 5 0 590',
			x:50,
			y:50,
			width:265,
			height:30,
			autoScroll:true,
			
			},*/
			

		
		 {			
			xtype : 'label',
			text :'Author:',
			//name: 'reviewername',
			align:'center',
			x:10,
			y:10,	
			width:300,	
			style:{
				'font-weight':'bold',
			}
			
			},
			
		 {			
			xtype : 'label',
			text :'Author1',
			//name: 'reviewername',
			align:'center',
			x:250,
			y:10,	
			width:300,	
			allowBlank: false,
			
			},
			 {		
			 	xtype : 'label',
			text :'Path :',
			align:'center',
			x:10,
			width:300,
			y:30,		
			allowBlank: false,
			
			},
			 {			
			xtype : 'label',
			text :'/ooh/users/ooh-newgen/To Newgen/	',
			//name: 'reviewername',
			align:'center',
			x:250,
			y:30,	
			width:300,	
			allowBlank: false,
			
			},
			 {	
			xtype : 'label',
			text :'File name :',				 	
		//	name: 'reviewername',
			align:'center',
			width:300,
			x:10,
			y:50,		
			allowBlank: false,
			
			},
			 {			
			xtype : 'label',
			text :'Typesetting	',
			//name: 'reviewername',
			align:'center',
			x:250,
			y:50,	
			width:300,	
			allowBlank: false,
			
			},
			 {	
			 	xtype : 'label',
			text :'Book Title :',			
			align:'center',
			x:10,
			y:70,		
			width:300,
			allowBlank: false,
			
			},
			{			
			xtype : 'label',
			text :'XYZ book	',			
			align:'center',
			x:250,
			y:70,	
			width:300,	
			allowBlank: false,			
			},
			 {			
			 	xtype : 'label',
			text :'HB ISDN :',	
			align:'center',
			x:10,
			y:90,		
			width:300,
			allowBlank: false,
			
			},
			{			
			xtype : 'label',
			text :'223566	',			
			align:'center',
			x:250,
			y:90,	
			width:300,	
			allowBlank: false,			
			},
		
		{			xtype : 'label',
			text :'PB ISDN :',
			align:'center',
			x:10,
			width:300,
			y:110,		
			allowBlank: false,
			
			},
			{			
			xtype : 'label',
			text :'223566	',			
			align:'center',
			x:250,
			y:110,	
			width:300,	
			allowBlank: false,			
			},
			{		
				xtype : 'label',
			text :'Date proofs required :',	
			align:'center',
			x:10,
			y:140,		
			width:300,
		style:{
			'font-weight':'bold',
		}		
			},
			
			{			
			xtype : 'label',
			text :'Design :',
			align:'center',
			x:10,
			y:160,		
			allowBlank: false,
			width:300,
			},
			{			
			xtype : 'label',
			text :'223566	',			
			align:'center',
			x:250,
			y:160,	
			width:300,	
			allowBlank: false,			
			},
			{	
				xtype : 'label',
			text :'Format :',					
			align:'center',
			x:10,
			y:180,		
			allowBlank: false,
			width:300,
			},
			{			
			xtype : 'label',
			text :'HTML	',			
			align:'center',
			x:250,
			y:180,	
			width:300,	
			allowBlank: false,			
			},
			
			{
               xtype: 'label',
              text: ' Notes :',
        //margins: '0 0 0 10'
                x:10,
			   y:200,
   },
   {			
			xtype : 'label',
			text :'Yes	',			
			align:'center',
			x:250,
			y:200,	
			width:300,	
			allowBlank: false,			
			},
			
			{	
		 	 xtype: 'label',
              text: 'Index Included?',		 
			align:'center',
			x:10,
			y:220,		
			allowBlank: false,
			width:300,
			},
			{			
			xtype : 'label',
			text :'Yes	',			
			align:'center',
			x:250,
			y:220,	
			width:300,	
			allowBlank: false,			
			},
			
			{	
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
			
			{	
				xtype:'label',		
			text : 'Author Details',		
			align:'center',
			x:10,
			y:320,	
			width:300,
			style:{
				'font-weight':'bold',
			}
			},
			 {
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId2',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:340,
			width:600,
			height:65,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },
			},

			
			{
				xtype:'label',		
			text : 'Author Name',				
			align:'center',
			x:10,
			y:340,		
			allowBlank: false,
			width:300,
			style:{
				'font-weight':'bold',
			  //  'border': '2px solid #000000',
			}
			
			},
			{			
			xtype : 'label',
			text :'tbc	',			
			align:'center',
			x:250,
			y:340,	
			width:300,	
			allowBlank: false,			
			},
			{	
					
				xtype:'label',		
			text : 'Address',			
			align:'center',
			x:10,
			y:360,		
			allowBlank: false,
			width:300,
			},
			{			
			xtype : 'label',
			text :'Delhi	',			
			align:'center',
			x:250,
			y:360,	
			width:300,	
			allowBlank: false,			
			},
			{	
			xtype:'label',		
			text : 'No. of proofs:',			
			align:'center',
			x:10,
			y:380,		
			allowBlank: false,
			width:300,
			},
			{			
			xtype : 'label',
			text :'3	',			
			align:'center',
			x:250,
			y:380,	
			width:300,	
			allowBlank: false,			
			},
			{
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId3',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:420,
			width:600,
			height:73,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },
			},
			
			{
			xtype:'label',		
			text : 'Author 2 Name',				
			align:'center',
			x:10,
			y:430,		
			allowBlank: false,
			width:300,
			style:{
				'font-weight':'bold',
			}
			},
			{			
			xtype : 'label',
			text :'tbc	',			
			align:'center',
			x:250,
			y:430,	
			width:300,	
			allowBlank: false,			
			},
			{	
					
				xtype:'label',		
			text : 'Address',			
			align:'center',
			x:10,
			y:450,		
			allowBlank: false,
			width:300,
			},
			{			
			xtype : 'label',
			text :'Delhi',			
			align:'center',
			x:250,
			y:450,	
			width:300,	
			allowBlank: false,			
			},
			{	
			xtype:'label',		
			text : 'No. of proofs:',			
			align:'center',
			x:10,
			y:470,		
			allowBlank: false,
			width:300,
			},
			{			
			xtype : 'label',
			text :'3	',			
			align:'center',
			x:250,
			y:470,	
			width:300,	
			allowBlank: false,			
			},
			
			{
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId4',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:530,
			width:600,
			height:30,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },
  },
			
			{	
				
			xtype:'label',		
			text : 'Typesetting Notes',
			align:'center',
			x:10,
			y:510,		
			allowBlank: false,
			width:300,
			style:{
				'font-weight':'bold',
			}
			},
			
			 {
            xtype: 'button',
            text :'Send',
             x:300,
			y:600,	
           	
       },
         {
            xtype: 'button',
            text :'Cancel',
           x:250,
			y:600,	
        }
			
		
			];
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


