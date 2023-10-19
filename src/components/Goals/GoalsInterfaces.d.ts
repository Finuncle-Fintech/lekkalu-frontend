export interface GoalDataInterface {
    goal: string;
    sub_goal: string;
    target_metric: number|string;
    current_metric: string;
    reachability_in_months: string;
    reachability_in_years: string;
    started: number | Date | string ;
    finished: number | Date | string ;
    comments: string;
    plannedFinish: number | Date | string ;
    planned_start: number | Date | string ;
    prefered_value_of_balance: string;
    user: number;
    balance:string|number|null
}
