import { Type } from "@angular/core";
import { TableRendererComponent } from "./table-renderer.component";
import { LineRendererComponent } from "./line-renderer.component";
import { PieRendererComponent } from "./pie-renderer.component";
import { RingRendererComponent } from "./ring-renderer.component";
import { RoseRendererComponent } from "./guage-renderer.component";
import { BarRendererComponent } from "./bar-renderer.component";
import { BarYRendererComponent } from "./barY-renderer.component";
import { DefaultRendererComponent } from "./default-renderer.component";

export class RendererFactory {

    public static table: Type<any> = TableRendererComponent;
    public static line: Type<any> = LineRendererComponent;
    public static pie: Type<any> = PieRendererComponent;
    public static ring: Type<any> = RingRendererComponent;
    public static rose: Type<any> = RoseRendererComponent;
    public static bar: Type<any> = BarRendererComponent;
    public static barY: Type<any> = BarYRendererComponent;
    public static default: Type<any> = DefaultRendererComponent;
}