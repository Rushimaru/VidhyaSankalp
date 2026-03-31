// ─── Individual reusable rules ───────────────────────────────────────────────

export const rules = {
  required: (label) => (value) =>
    !value || !String(value).trim() ? `${label} is required.` : null,

  email: (label = 'Email') => (value) =>
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? `${label} must be a valid email address.`
      : null,

  phone: (label = 'Mobile number') => (value) =>
    value && !/^\d{10}$/.test(value)
      ? `${label} must be a valid 10-digit number.`
      : null,

  aadhar: (label = 'Aadhar') => (value) =>
    value && !/^\d{12}$/.test(value)
      ? `${label} must be exactly 12 digits.`
      : null,

  minLength: (min, label = 'Field') => (value) =>
    value && value.length < min
      ? `${label} must be at least ${min} characters.`
      : null,

  maxLength: (max, label = 'Field') => (value) =>
    value && value.length > max
      ? `${label} must not exceed ${max} characters.`
      : null,

  numeric: (label = 'Field') => (value) =>
    value && !/^\d+(\.\d+)?$/.test(value)
      ? `${label} must be a number.`
      : null,

  year: (label = 'Year') => (value) =>
    value && !/^\d{4}$/.test(value)
      ? `${label} must be a valid 4-digit year.`
      : null,
};

// ─── Run a list of rules against a value, return first error ─────────────────
export const applyRules = (value, ruleList) => {
  for (const rule of ruleList) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

// ─── Validate entire student form ────────────────────────────────────────────
export const validateStudent = (f) => {
  const errors = {};

  const check = (field, ruleList) => {
    const err = applyRules(f[field], ruleList);
    if (err) errors[field] = err;
  };

  // Academic
  check('academicYear',  [rules.required('Academic year')]);
  check('classSection',  [rules.required('Class')]);
  check('section',       [rules.required('Section')]);
  check('admissionNo',   [rules.required('Admission number'), rules.maxLength(20, 'Admission number')]);

  // Personal
  check('fullName',      [rules.required('Full name'), rules.maxLength(100, 'Full name')]);
  check('gender',        [rules.required('Gender')]);
  check('dateOfBirth',   [rules.required('Date of birth')]);
  check('category',      [rules.required('Category')]);
  check('religion',      [rules.required('Religion')]);
  check('motherTongue',  [rules.required('Mother tongue')]);
  check('nationality',   [rules.required('Nationality')]);
  check('phoneNumber',   [rules.required('Mobile number'), rules.phone('Mobile number')]);
  check('aadharNumber',  [rules.aadhar('Aadhar number')]);         // optional but validated if filled
  check('studentEmail',  [rules.email('Student email')]);           // optional but validated if filled

  // Parents (father required)
  check('fathersName',   [rules.required("Father's name")]);
  check('fathersPhone',  [rules.required("Father's mobile"), rules.phone("Father's mobile")]);
  check('mothersName',   [rules.required("Mother's name")]);
  check('mothersPhone',  [rules.phone("Mother's mobile")]);        // optional but validated if filled

  // Guardian (only if "other" selected)
  if (f.primaryGuardian === 'other') {
    check('guardianName',     [rules.required('Guardian name')]);
    check('guardianPhone',    [rules.required('Guardian mobile'), rules.phone('Guardian mobile')]);
    check('guardianRelation', [rules.required('Guardian relation')]);
    check('guardianEmail',    [rules.email('Guardian email')]);
  }

  // Address
  check('currentAddress', [rules.required('Current address')]);

  // Medical (optional but validated if filled)
  check('height', [rules.numeric('Height')]);
  check('weight', [rules.numeric('Weight')]);

  // Previous school (optional but validated if filled)
  check('prevPassYear', [rules.year('Passing year')]);

  // Login
  check('loginEmail', [rules.required('Login email'), rules.email('Login email')]);
  check('password',   [rules.required('Password'), rules.minLength(6, 'Password')]);

  return errors;
};