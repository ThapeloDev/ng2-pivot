import { Component, OnInit, Input, Type, ViewChild, AfterViewInit, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { AdDirective } from "./ad.directive";
import { RendererFactory } from "./renderers/renderer-factory.service";
import { CQL_AST } from "../../modules/cql_ast.module";
import { Renderer } from "./renderers/renderer.interface";

@Component({
    selector: 'pivot-chart',
    template: `<div class="chart-box"><ad-host></ad-host></div>`,
    styleUrls: ['./chart.component.less']
})

export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    inited: boolean = false;
    dynamicComp: Type<any>;
    componentRef;
    _type: string;
    _title: string;
    _cql_ast: CQL_AST;
    _data: any;
    interval;
    needRenderComp: boolean = false;
    needRender: boolean = false; 
    @Input() 
    set type(type: string){
        this._type = type || 'default';
        this.dynamicComp = RendererFactory[this._type];
        if(!this.dynamicComp){
            console.error(`${type}渲染器未定义`);
            return ;
        }
        if(this.inited){
            this.needRenderComp = true;
        }
    }
    get type(): string{
        return this._type;
    }
    @Input() 
    set title(title: string){
        this._title = title;
        this.needRender = true;
    }
    get title(): string{
        return this._title;
    }
    @Input() 
    set cql_ast(cql_ast: CQL_AST){
        this._cql_ast = cql_ast;
        this.needRender = true;
    }
    get cql_ast(): CQL_AST{
        return this._cql_ast
    }
    @Input() 
    set data(data: any){
        this._data = data;
        this.needRender = true;
    }
    get data(): any{
        return this._data;
    }

    @ViewChild(AdDirective) adHost: AdDirective;

    renderComp(){
        if(this.dynamicComp){
            let viewContainerRef = this.adHost.viewContainerRef;
            viewContainerRef.clear();
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.dynamicComp);
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            this.doRender();
        }
    }

    doRender(){
        if(this.validRend()){
            setTimeout(() => {
                this.componentRef.instance.render(this.cql_ast, this.data, this.title);
            });
        }
    }

    private validRend(){
        if(this.componentRef && this.cql_ast && this.data)
            return true;
        return false;
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.inited = true;
        });
        this.interval = setInterval(() => {
            if(this.needRenderComp){
                this.renderComp();
                this.needRenderComp = false;
                this.needRender = false;
                return ;
            }
            if(this.needRender){
                this.doRender();
                this.needRender = false;
            }
        },500);
    }

    ngOnDestroy(): void {
        if(this.interval)
            clearInterval(this.interval);
    }

    ngOnInit() { }
}