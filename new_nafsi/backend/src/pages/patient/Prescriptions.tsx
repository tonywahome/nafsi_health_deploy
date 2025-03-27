import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PillIcon, RefreshCwIcon } from 'lucide-react';
const Prescriptions: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    prescriptions,
    requestRefill
  } = useData();
  // Filter prescriptions for current patient
  const patientPrescriptions = prescriptions.filter(rx => rx.patientId === user?.id || rx.patientId === 'p1');
  const activePrescriptions = patientPrescriptions.filter(rx => new Date(rx.endDate) >= new Date());
  const expiredPrescriptions = patientPrescriptions.filter(rx => new Date(rx.endDate) < new Date());
  const handleRefillRequest = (id: string) => {
    requestRefill(id);
  };
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
        <p className="text-gray-600">Manage your medications and refills</p>
      </div>
      <div className="space-y-6">
        {/* Active Prescriptions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Active Prescriptions
          </h2>
          {activePrescriptions.length > 0 ? <div className="grid gap-6 md:grid-cols-2">
              {activePrescriptions.map(prescription => <Card key={prescription.id} className="border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {prescription.medication}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {prescription.dosage}, {prescription.frequency}
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-500">
                          Start: {prescription.startDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          End: {prescription.endDate}
                        </p>
                      </div>
                    </div>
                    {prescription.refillable && prescription.remainingRefills > 0 && <Button variant="outline" size="sm" onClick={() => handleRefillRequest(prescription.id)}>
                          <RefreshCwIcon className="h-4 w-4 mr-1" />
                          Request Refill ({prescription.remainingRefills})
                        </Button>}
                  </div>
                </Card>)}
            </div> : <Card className="text-center py-6 border border-gray-200">
              <PillIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="mt-2 text-gray-500">No active prescriptions</p>
            </Card>}
        </div>
        {/* Expired Prescriptions */}
        {expiredPrescriptions.length > 0 && <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Past Prescriptions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {expiredPrescriptions.map(prescription => <Card key={prescription.id} className="border border-gray-200 bg-gray-50">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {prescription.medication}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {prescription.dosage}, {prescription.frequency}
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-500">
                        Start: {prescription.startDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        End: {prescription.endDate}
                      </p>
                    </div>
                  </div>
                </Card>)}
            </div>
          </div>}
      </div>
    </DashboardLayout>;
};
export default Prescriptions;