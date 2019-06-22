$(function () {
    let box =$('.box');
    let black={},white={};
    let blank ={};
    let ai=true;
    for(let i=0;i<15;i++){
        for(let j=0;j<15;j++){
            $('<div>').addClass('chess').attr('id',i+'_'+j).appendTo('.box');
            blank[i+'_'+j]=true;
        }
    }

    let flag =true;
    box.on('click','.chess',function () {
        flag = !flag;
        let _this=$(this);
        let coords=_this.attr('id');
        if(_this.hasClass('black') || _this.hasClass('white')){
            return;
        }

        if(flag){
            black[coords]=true;
            delete blank[coords];
            $(this).addClass('black');
            isSuccess(black,coords);
        }else{
            white[coords]=true;
            delete blank[coords];
            $(this).addClass('white');
            isSuccess(white,coords);
            if(ai){
                let pos =aifn();
                black[pos]=true;
                delete blank[pos];
                $('#'+pos).addClass('black');
                isSuccess(black,pos);
                flag = !flag;
            }
        }

    });
    function aifn() {
        let blankScore=0,whiteScore=0;
        let pos1='',pos2='';
        for (let i in blank){
            let score =isSuccess(black,i);
            if(score>=blankScore){
                blankScore=score;
                pos1=i;
            }
        }
        for (let i in blank){
            let score =isSuccess(white,i);
            if(score>=whiteScore){
                whiteScore=score;
                pos2=i;
            }
        }
        return blankScore>=whiteScore?pos1:pos2;

    }
    function isSuccess(obj,coords) {
        let sp=1,cz=1,yx=1,zx=1;
        let [x,y]=coords.split('_');
        let i=x*1,j=y*1;
        while(obj[i+'_'+ (++j)]){
            sp++;
        }
        j=y*1;
        while(obj[i+'_'+(--j)]){
            sp++;
        }

        j=y*1;
        while(obj[++i+'_'+ j]){
            cz++;
        }
        i=x*1;
        while(obj[--i+'_'+j]){
            cz++;
        }
        i=x*1;
        while(obj[--i+'_'+(++j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while(obj[(++i)+'_'+(--j)]){
            yx++;
        }


        i=x*1;
        j=y*1;
        while(obj[--i+'_'+(--j)]){
            zx++;
        }
        i=x*1;
        j=y*1;
        while(obj[(++i)+'_'+(++j)]){
            zx++;
        }

        let max=Math.max(sp,cz,yx,zx);
        console.log(max);
        if(max===5){
            $('<div>').addClass('success').appendTo('.box');
            box.off('click');
            $('<button>').addClass('replay').text('再来一次').css({"background":'#ff933b',"border":'1px solid black'}).appendTo('.box');
            $('<button value="退出">').addClass('out').text('退出').css({"background":'#ff933b',"border":'1px solid black'}).appendTo('.box');
            let replay=$('.replay');
            let out =$('.out');
            replay.on('click',function () {
                location.reload(true);
            });
            out.on('click',function () {
                window.close();
            });

        }
        return max;
    }
});