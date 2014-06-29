 Ext.define('MyDesktop.store.Deptreviewer', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Dept',
        proxy: {
    		type:'ajax',
			url: 'service/Dept.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:9},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	