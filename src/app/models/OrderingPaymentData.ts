import { MenuItem } from './cart';

export class OrderingPaymentData{

      restaurantId: string;
      restaurantName: string;
      userId: string;
      totalPoints: number;
      DateTime : string;
      menuItems: MenuItem[];

      constructor(_restaurantId:string,
                 _restaurantName:string,
                 _userId:string,
                _totalPoints:number,
                _dateTime:string,
                _menuItems:Array<MenuItem>)
                {
                    this.restaurantId=_restaurantId;
                    this.restaurantName=_restaurantName;
                    this.userId=_userId;
                    this.totalPoints=_totalPoints;
                    this.DateTime = _dateTime;
                    this.menuItems=_menuItems;
                }



}