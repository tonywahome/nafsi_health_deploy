import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ClipboardListIcon } from 'lucide-react';
const MedicalHistory: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    medicalRecords
  } = useData();
  // Filter records for current patient
  const patientRecords = medicalRecords.filter(record => record.patientId === user?.id || record.patientId === 'p1').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medical History</h1>
        <p className="text-gray-600">View your complete medical history</p>
      </div>
      {patientRecords.length > 0 ? <div className="space-y-6">
          {patientRecords.map(record => <Card key={record.id} className="border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {record.diagnosis}
                </h3>
                <span className="text-sm text-gray-500">{record.date}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Treatment
                  </h4>
                  <p className="text-gray-600">{record.treatment}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Notes</h4>
                  <p className="text-gray-600">{record.notes}</p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Doctor: {record.doctorName}
                  </p>
                </div>
              </div>
            </Card>)}
        </div> : <Card className="text-center py-12 border border-gray-200">
          <ClipboardListIcon className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No medical records
          </h3>
          <p className="mt-1 text-gray-500">
            Your medical history will appear here
          </p>
        </Card>}
    </DashboardLayout>;
};
export default MedicalHistory;