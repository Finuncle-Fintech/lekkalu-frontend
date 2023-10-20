export interface GoalDataInterface {
    goal: string;
    sub_goal: string;
    target_metric: number;
    current_metric: number;
    balance: number; // Updated to allow string
    reachability_in_months: number;
    reachability_in_years: number;
    started: Date; // Updated to use string
    finished: Date; // Updated to use string
    planned_start: Date; // Updated to use string
    prefered_value_of_balance: string;
    user: number;
    comments?: string;
    id?: number;
    plannedFinish?: string; // Updated to use string
}
