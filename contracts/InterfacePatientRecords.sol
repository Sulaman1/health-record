// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @title InterfacePatientRecords
/// @author Nicolas Frega - <frega.nicolas@gmail.com>
/// Allows Medical Record System to maintain records of patients in their network.
/// Records can be accessed by Hospitals if and only if patient provides name.
/// Patients are rewarded with erc20 tokens for providing their name

interface InterfacePatientRecords {
    /// @dev Fallback function allows to deposit ether.
    // function() external payable;

    /*
     * external functions
     */
    /// @dev Allows to add a new hospital in the network.
    /// @param _hospital Address of new hospital.
    function addHospital(address _hospital) external;

    /// @dev Allows to remove a hospital in the network.
    /// @param _hospital Address of hospital to remove.
    function removeHospital(address _hospital) external;

    /// @dev Allows to add a new patient in the network.
    /// @param _patient Address of new patient.
    function addPatient(address _patient) external;

    /// @dev Allows to remove a patient in the network.
    /// @param _patient Address of patient to remove.
    function removePatient(address _patient) external;

    /// @dev Allows to add a patient record in the network.
    /// @param _patientAddress address of the patient for record.
    /// @param _hospital address of the hospital for record.
    /// @param _admissionDate date of admission, simple uint.
    /// @param _dischargeDate date of discharge, simple uint.
    /// @param _visitReason internal code for reason for visit.
    function addRecord(
        address _patientAddress,
        address _hospital,
        uint256 _admissionDate,
        uint256 _dischargeDate,
        uint256 _visitReason
    ) external;

    /// @dev Allows a patient to add their name to the record in the network.
    /// @param _recordID ID of the patient specific record.
    /// @param _name Name for the patient
    function addName(uint256 _recordID, string memory _name) external;

    /// @dev Allows a Hospital to retrieve the record for a patient.
    /// @param _recordID ID of the patient specific record.
    /// @param _patientAddress address of the patient for record.
    function getRecord(uint _recordID, address _patientAddress)
        external
        view
        returns (
            string memory _name,
            address _hospital,
            uint256 _admissionDate,
            uint256 _dischargeDate,
            uint256 _visitReason
        );

    /// @dev Allows a Hospital to view the number of records for a patient.
    /// @param _name Name for the patient
    function getRecordByName(string memory _name)
        external
        view
        returns (uint256 numberOfRecords);

    /// @dev Allows a Hospital to view the number of patients on a given date range.
    /// @param from Starting date
    /// @param to Ending date
    function getCurrentPatients(uint from, uint to)
        external
        view
        returns (uint _numberOfPatients);

    /// @dev sets the amount of Spring token rewards for providing name.
    /// @param _tokenReward Amount of tokens to reward patient.
    function setSpringTokenReward(uint256 _tokenReward) external;

    /// @dev gets the balance of patient.
    /// @param _patientAddress address of patient.
    /// @return Returns patient balance.
    function getPatientBalance(address _patientAddress)
        external
        view
        returns (uint256);

    /*
     * Internal functions
     */
    /// @dev sets the patient token reward contract.
    /// @param _newsprintToken Address of patient token.
    function setSpringToken(address _newsprintToken) external;

    /// @dev pays a patient for providing their name.
    /// @param _patientAddress to receive tokens.
    function payPatient(address _patientAddress) external;
}
