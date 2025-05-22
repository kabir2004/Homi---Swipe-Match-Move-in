"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Check, CreditCard, Lock, Heart, Filter, Rewind, MessageSquare } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface PremiumUpgradeProps {
  onUpgrade: () => void
}

export function PremiumUpgrade({ onUpgrade }: PremiumUpgradeProps) {
  const [step, setStep] = useState<number>(1)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleContinue = () => {
    setStep(2)
  }

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3)
    }, 2000)
  }

  const handleComplete = () => {
    onUpgrade()
  }

  return (
    <div className="py-4">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Upgrade to Homi Premium</h2>
              <p className="text-gray-600">Unlock all features and find your perfect match faster</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <Heart className="h-5 w-5 text-pink-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Unlimited Swipes</h3>
                  <p className="text-sm text-gray-600">Swipe as much as you want without limits</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <Filter className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Advanced Filters</h3>
                  <p className="text-sm text-gray-600">Filter by more criteria to find exactly what you want</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">See Who Liked You</h3>
                  <p className="text-sm text-gray-600">View profiles of people who already liked you</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <Rewind className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Rewind Feature</h3>
                  <p className="text-sm text-gray-600">Go back to profiles you accidentally passed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <MessageSquare className="h-5 w-5 text-cyan-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Priority Support</h3>
                  <p className="text-sm text-gray-600">Get help faster with dedicated support</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-blue-600">$9.99</span>
              <span className="text-gray-600">/month</span>
            </div>

            <Button onClick={handleContinue} className="w-full bg-blue-600 hover:bg-blue-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Continue to Payment
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
              <p className="text-gray-600">Enter your payment information to continue</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    className="pl-10"
                    defaultValue="4242 4242 4242 4242"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" defaultValue="12/25" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <div className="relative">
                    <Input id="cvc" placeholder="123" className="pl-10" defaultValue="123" />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-blue-600">$9.99</span>
              <span className="text-gray-600">/month</span>
            </div>

            <Button onClick={handlePayment} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay Securely
                </>
              )}
            </Button>

            <p className="text-xs text-center mt-4 text-gray-500">
              Your payment is secure and encrypted. By proceeding, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600">You've successfully upgraded to Homi Premium</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-amber-600" />
                <h3 className="font-medium text-amber-800">Premium Benefits Activated</h3>
              </div>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" />
                  Unlimited swipes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" />
                  Advanced filters
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" />
                  See who liked you
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" />
                  Rewind feature
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-600" />
                  Priority support
                </li>
              </ul>
            </div>

            <Button onClick={handleComplete} className="w-full bg-blue-600 hover:bg-blue-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Start Using Premium
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
