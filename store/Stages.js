 Ext.define('MyDesktop.store.Stages', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Stages',
        proxy: {
    		type:'ajax',
			url: 'service/stages.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:1},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	