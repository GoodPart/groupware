type optionType = {
    sortType : string,
    sortBy : string,
    sortTarget : any
}

export default function sortProcess(sort_target:any, option:optionType) {
    /*
        option : {
            sortType : "date", "string", "number",
            sortBy : "asc", "desc"
        }
    */
   console.log(option)

    function _sort(list:any, sort_type:string, sort_by:string) {
        
     

    }


    



    switch(option.sortBy) {
        case "DESC" : 
            return _sort(sort_target, option.sortType, option.sortBy)
        case "ASC" : 
            return _sort(sort_target, option.sortType, option.sortBy)
        default : 
            return false
    }
    
    // list.sort()
}