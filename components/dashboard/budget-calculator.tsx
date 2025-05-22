"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Download, Calculator, AlertTriangle } from "lucide-react"

type ExpenseCategory = {
  name: string
  amount: number
  color: string
  percentage: number
}

export function BudgetCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(2000)
  const [maxRent, setMaxRent] = useState(600) // 30% of income
  const [otherExpenses, setOtherExpenses] = useState(500)
  const [savingsGoal, setSavingsGoal] = useState(200)
  const [activeTab, setActiveTab] = useState("overview")

  // Budget data
  const budget = {
    total: 1500,
    spent: {
      rent: 1100,
      utilities: 150,
      food: 200,
      transportation: 100,
      entertainment: 50,
      other: 50,
    },
    remaining: 50,
  }

  // Calculate total expenses
  const totalExpenses = Object.values(budget.spent).reduce((sum, amount) => sum + amount, 0)

  // Calculate expense categories with percentages
  const expenseCategories: ExpenseCategory[] = [
    {
      name: "Rent",
      amount: budget.spent.rent,
      color: "bg-blue-500",
      percentage: Math.round((budget.spent.rent / totalExpenses) * 100),
    },
    {
      name: "Utilities",
      amount: budget.spent.utilities,
      color: "bg-green-500",
      percentage: Math.round((budget.spent.utilities / totalExpenses) * 100),
    },
    {
      name: "Food",
      amount: budget.spent.food,
      color: "bg-yellow-500",
      percentage: Math.round((budget.spent.food / totalExpenses) * 100),
    },
    {
      name: "Transportation",
      amount: budget.spent.transportation,
      color: "bg-purple-500",
      percentage: Math.round((budget.spent.transportation / totalExpenses) * 100),
    },
    {
      name: "Entertainment",
      amount: budget.spent.entertainment,
      color: "bg-pink-500",
      percentage: Math.round((budget.spent.entertainment / totalExpenses) * 100),
    },
    {
      name: "Other",
      amount: budget.spent.other,
      color: "bg-gray-500",
      percentage: Math.round((budget.spent.other / totalExpenses) * 100),
    },
  ]

  // Handle recalculation
  const handleRecalculate = () => {
    // Calculate 30% of income for max rent
    const calculatedMaxRent = Math.round(monthlyIncome * 0.3)
    setMaxRent(calculatedMaxRent)

    // In a real app, this would update the budget calculations
    console.log("Recalculating budget with:", { monthlyIncome, maxRent: calculatedMaxRent, otherExpenses, savingsGoal })
  }

  // Handle export
  const handleExport = () => {
    // In a real app, this would generate and download a budget report
    console.log("Exporting budget report")
    alert("In a real app, this would download a PDF budget report.")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Monthly Budget Breakdown</CardTitle>
                  <CardDescription>Track your housing and related expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseCategories.map((category) => (
                      <div key={category.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm">
                            ${category.amount} ({category.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${category.color}`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Budget Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Monthly Budget</p>
                      <p className="text-2xl font-bold">${budget.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Spent</p>
                      <p className="text-2xl font-bold">${totalExpenses}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining</p>
                      <p className={`text-2xl font-bold ${budget.remaining < 100 ? "text-red-600" : "text-green-600"}`}>
                        ${budget.remaining}
                      </p>
                      {budget.remaining < 100 && (
                        <div className="flex items-center text-red-600 text-sm mt-1">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Your budget is running low
                        </div>
                      )}
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium mb-2">Spending Visualization</p>
                      <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                        {expenseCategories.map((category) => (
                          <div
                            key={category.name}
                            className={`h-full ${category.color}`}
                            style={{ width: `${category.percentage}%` }}
                            title={`${category.name}: $${category.amount} (${category.percentage}%)`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Budget Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Budget Tips</CardTitle>
              <CardDescription>Maximize your student housing budget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-700 mb-2">30% Rule</h3>
                  <p className="text-sm text-blue-600">
                    Try to keep your rent at or below 30% of your monthly income to maintain a balanced budget.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-medium text-green-700 mb-2">Roommates Save Money</h3>
                  <p className="text-sm text-green-600">
                    Sharing housing with roommates can reduce your rent by 40-50% compared to living alone.
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="font-medium text-amber-700 mb-2">Factor in Utilities</h3>
                  <p className="text-sm text-amber-600">
                    Don't forget to budget for utilities, which typically add 10-20% to your monthly housing costs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6 mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Affordability Calculator</CardTitle>
              <CardDescription>Calculate how much rent you can afford</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="monthly-income">Monthly Income ($)</Label>
                    <Input
                      id="monthly-income"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="other-expenses">Other Monthly Expenses ($)</Label>
                    <Input
                      id="other-expenses"
                      type="number"
                      value={otherExpenses}
                      onChange={(e) => setOtherExpenses(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="savings-goal">Monthly Savings Goal ($)</Label>
                    <Input
                      id="savings-goal"
                      type="number"
                      value={savingsGoal}
                      onChange={(e) => setSavingsGoal(Number(e.target.value))}
                    />
                  </div>
                  <Button onClick={handleRecalculate}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Results</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Recommended Max Rent (30% Rule)</p>
                      <p className="text-2xl font-bold text-primary">${maxRent}/month</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available for Other Expenses</p>
                      <p className="text-xl font-medium">${monthlyIncome - maxRent - savingsGoal}/month</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Savings</p>
                      <p className="text-xl font-medium">${savingsGoal}/month</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium mb-2">Budget Allocation</p>
                      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(maxRent / monthlyIncome) * 100}%` }}
                          title={`Rent: $${maxRent} (${Math.round((maxRent / monthlyIncome) * 100)}%)`}
                        ></div>
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${(otherExpenses / monthlyIncome) * 100}%` }}
                          title={`Other Expenses: $${otherExpenses} (${Math.round((otherExpenses / monthlyIncome) * 100)}%)`}
                        ></div>
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${(savingsGoal / monthlyIncome) * 100}%` }}
                          title={`Savings: $${savingsGoal} (${Math.round((savingsGoal / monthlyIncome) * 100)}%)`}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Rent: {Math.round((maxRent / monthlyIncome) * 100)}%</span>
                        <span>Expenses: {Math.round((otherExpenses / monthlyIncome) * 100)}%</span>
                        <span>Savings: {Math.round((savingsGoal / monthlyIncome) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6 mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Housing Cost Comparison</CardTitle>
              <CardDescription>Compare costs of different housing options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Property</th>
                      <th className="text-left p-2">Rent</th>
                      <th className="text-left p-2">Utilities</th>
                      <th className="text-left p-2">Distance</th>
                      <th className="text-left p-2">Total Cost</th>
                      <th className="text-left p-2">Affordability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-2">Campus View Apartments</td>
                      <td className="p-2">$1,200</td>
                      <td className="p-2">$100</td>
                      <td className="p-2">5 min walk</td>
                      <td className="p-2 font-medium">$1,300</td>
                      <td className="p-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Over Budget</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-2">University Heights</td>
                      <td className="p-2">$950</td>
                      <td className="p-2">$80</td>
                      <td className="p-2">10 min walk</td>
                      <td className="p-2 font-medium">$1,030</td>
                      <td className="p-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Near Budget</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-2">Maple Street Apartments</td>
                      <td className="p-2">$1,100</td>
                      <td className="p-2">$90</td>
                      <td className="p-2">15 min walk</td>
                      <td className="p-2 font-medium">$1,190</td>
                      <td className="p-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Over Budget</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2">Shared House (3 roommates)</td>
                      <td className="p-2">$600</td>
                      <td className="p-2">$70</td>
                      <td className="p-2">20 min walk</td>
                      <td className="p-2 font-medium">$670</td>
                      <td className="p-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Within Budget
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto" onClick={handleExport}>
                <DollarSign className="h-4 w-4 mr-2" />
                Export Comparison Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
