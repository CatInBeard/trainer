class Trainer{
    constructor(){
        this.change_size();
        this.blocks=[];
        this.status=0;
        this.showtime=2000;
        this.delaytime=100;
        this.correct=0;
        this.errors=0;
        this.partly_corret=0;
    }
    change_size(start=false){
        this.vt=parseInt(window.vt.value);
        this.hr=parseInt(window.hr.value);
        if(start){
            window.sizer.style.visibility="hidden";
            window.main_view.style.visibility="visible";
            window.sizer.style.width="0px";
            window.sizer.style.height="0px";
            window.main_view.style.width="auto";
            window.main_view.style.height="auto";
            
            var cells="";
            var count=0;
            for(var i=0;i<this.vt;i++){
                cells=cells+ "<tr>";
                for(var j=0;j<this.hr;j++){
                    count++;
                    cells=cells+ "<td id='block"+count+"' onclick='window.trainer.block_click("+count+")'></td>";
                }
                cells=cells+ "</tr>";
            }
            blocks.innerHTML=cells;
        }
    }
    ask_change(){
        window.sizer.style.visibility="visible";
        window.main_view.style.visibility="hidden";
        window.sizer.style.width="auto";
        window.sizer.style.height="auto";
        window.main_view.style.width="0px";
        window.main_view.style.height="0px";
    }
    numGen(){
        var number;
        var number_inverse;
        number=(Math.ceil(Math.random()*255));
        number_inverse=255-number;
        number_inverse=number_inverse.toString(16);
        number=number.toString(16);
        if(number.length==1){
            number='0'+number;
        }
        if(number_inverse.length==1){
            number_inverse='0'+number_inverse;
        }
        return [number,number_inverse];
    }
    start(){
        if(this.status==0 || this.status==3){
            this.end_color_indicator();
            this.partly_corret=0;
            this.status=1;
            this.clear();
            var colors=this.colorGenerator();
            this.colorOne=colors[0];
            this.colorTwo=colors[1];
            this.blocks=[];
            for(var i=0;i<this.vt*this.hr;i++){
                this.blocks[i]=Math.round(Math.random());
                var block=document.getElementById("block"+(i+1));
                if(this.blocks[i]==1){
                    this.partly_corret++;
                    block.style.backgroundColor=this.colorOne;
                }
                else{
                    block.style.backgroundColor=this.colorTwo;
                }
            }
            var that=this;
            setTimeout(function(){ that.hide_blocks(that) },that.showtime);
        }
    }
    colorGenerator(){
        var colors=this.numGen();
        var colorOne='#'+colors[0];
        var colorTwo='#'+colors[1];
        colors=this.numGen();
        colorOne=colorOne+colors[0];
        colorTwo=colorTwo+colors[1];
        colors=this.numGen();
        colorOne=colorOne+colors[0];
        colorTwo=colorTwo+colors[1];
        return [colorOne,colorTwo];
    }
    hide_blocks(that=false){
        if(!that){
            that=this;
        }
        that.clear(false,that);
        that.status=2;
        setTimeout(function(){color_indicator.style.backgroundColor=that.colorOne; that.status=3;},that.delaytime);
    }
    clear(full=false,that=false){
        if(!that){
            that=this;
        }
        if(full){
            that.status=0;
        }
        for(var i=0;i<that.vt*that.hr;i++){
            var block=document.getElementById("block"+(i+1));
            block.style.backgroundColor="#FFFFFF";
        }
    }
    block_click(block_num){
        if(this.status==3){
            var block=document.getElementById("block"+(block_num));
            if(this.blocks[block_num-1]==1){
                block.style.backgroundColor="#00FF00";
                this.partly_corret--;
                if(this.partly_corret<=0){
                    this.correct++;
                    indicator_ok.innerHTML="Верно: "+this.correct;
                    this.end_color_indicator();
                    var that=this;
                    setTimeout(function(){that.clear(true,that)},500);
                }
            }
            else{
                block.style.backgroundColor="#000000";
                this.errors++;
                indicator_err.innerHTML="Ошибок: "+this.errors;
            }
        }
    }
    end_color_indicator(){
        color_indicator.style.backgroundColor="#FFFFFF";
    }
}

window.onload = function(){
    window.trainer= new Trainer();
}