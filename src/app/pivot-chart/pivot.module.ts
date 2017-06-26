import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CSV2DBService } from "./services/csv-db.service";
import { DndModule } from 'ng2-dnd';
import { CQLParserService } from "./services/cql-parser.service";
import { ValFieldsPipe } from "./pipes/val-fields.pipe";
import { SelectPartPipe } from "./pipes/select-part.pipe";
import { DatabaseService } from "./services/database.service";
import { PivotComponent } from "./components/pivot/pivot.component";
import { ChartComponent } from "./components/chart/chart.component";
import { DimensionComponent } from "./components/pivot/dimension.component";
import { ValueComponent } from "./components/pivot/value.component";
import { TableRendererComponent, LazzyLoadPipe } from "./components/chart/renderers/table-renderer.component";
import { AdDirective } from "./components/chart/ad.directive";
import { LineRendererComponent } from "./components/chart/renderers/line-renderer.component";
import { ChartDirective } from "./directives/chart.directive";
import { FieldFiltPipe } from "./pipes/field-filt.pipe";
import { FormsModule } from "@angular/forms";
import { ChartParamComponent } from "./components/chart-param/chart-param.component";
import { ChartParamService } from "./components/chart-param/chart-param.service";
import { PieRendererComponent } from "./components/chart/renderers/pie-renderer.component";
import { RingRendererComponent } from "./components/chart/renderers/ring-renderer.component";
import { RoseRendererComponent } from "./components/chart/renderers/guage-renderer.component";
import { BarRendererComponent } from "./components/chart/renderers/bar-renderer.component";
import { BarYRendererComponent } from "./components/chart/renderers/barY-renderer.component";
import { DefaultRendererComponent } from "./components/chart/renderers/default-renderer.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DndModule.forRoot()
    ],
    exports: [
        PivotComponent,
        ChartComponent,
        ChartParamComponent
    ],
    entryComponents: [
        TableRendererComponent,
        LineRendererComponent,
        PieRendererComponent,
        RingRendererComponent,
        RoseRendererComponent,
        BarRendererComponent,
        BarYRendererComponent,
        DefaultRendererComponent
    ],
    declarations: [
        PivotComponent,
        ValFieldsPipe,
        SelectPartPipe,
        FieldFiltPipe,
        ChartComponent,
        DimensionComponent,
        ValueComponent,
        AdDirective,
        ChartDirective,
        ChartParamComponent,
        TableRendererComponent,
        LineRendererComponent,
        PieRendererComponent,
        RingRendererComponent,
        RoseRendererComponent,
        BarRendererComponent,
        BarYRendererComponent,
        DefaultRendererComponent,
        LazzyLoadPipe
    ],
    providers: [
        DatabaseService,
        CSV2DBService,
        CQLParserService,
        ChartParamService
    ],
})
export class PivotModule { }
