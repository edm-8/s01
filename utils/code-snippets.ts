export const complianceSnippets = [
  `function validateDataIntegrity(data) {
  const hash = calculateHash(data);
  return verifySignature(hash);
}`,
  `class GMPValidator {
  constructor(auditTrail) {
    this.auditTrail = auditTrail;
  }
  
  checkCompliance() {
    return this.auditTrail.validate();
  }
}`,
  `async function validateBatchRecord(batch) {
  const signaturesValid = await validateSignatures(batch);
  const auditTrailValid = await checkAuditTrail(batch);
  return signaturesValid && auditTrailValid;
}`,
  `const analyzeCompliance = (data) => {
  const result = validateDistribution(data);
  plotComplianceTrend(result);
  return result;
};`,
  `SELECT timestamp, action_type, COUNT(*) as frequency
FROM audit_trail
WHERE validation_status = 'VERIFIED'
GROUP BY timestamp, action_type;`,
  `public class ComplianceValidator<T extends Record> {
  public ValidationResult validate(T record, Set<Rule> rules) {
    return rules.stream()
                .map(r -> r.apply(record))
                .collect(Collectors.toList());
  }
}`,
  `public async Task<ValidationResult> ValidateAsync(
  Record record,
  CancellationToken token
) {
  var result = await _validator.CheckAsync(record);
  await _auditLogger.LogAsync(result);
  return result;
}`
]

export const regulatorySnippets = [
  '21 CFR Part 11 Electronic Records',
  'EU GMP Annex 11 Computerized Systems',
  'ICH Q9 Quality Risk Management',
  'GAMP 5 Risk-Based Approach',
  'Data Integrity ALCOA+ Principles',
  'ISO 9001:2015 Quality Management',
  'PIC/S GMP Guide Annex 15',
  'FDA Data Integrity Guidance',
  'EMA Data Integrity Guidelines',
  'WHO GMP Guidelines',
  'ICH Q10 Pharmaceutical Quality System',
  'ISO 13485 Medical Devices'
]

export const complianceTerms = [
  'Audit Trail Verification',
  'Electronic Signatures',
  'Version Control',
  'Change Management',
  'Access Control',
  'Data Backup',
  'System Validation',
  'Risk Assessment',
  'Data Lifecycle',
  'Metadata Analysis',
  'Continuous Monitoring',
  'Quality Metrics',
  'Process Validation',
  'Computer System Validation',
  'Data Migration Validation',
  'Cloud Compliance'
]

